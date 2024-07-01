"use server"

import { TAGS } from '@/storefront/lib/constants';
import { addToCart, createCart, getCart, removeFromCart, updateCart, updateCartAttributes, updateCartBuyerIdentity, updateCartLines } from '@/storefront/lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { Cart, ShopifyCartAttribute } from '../lib/shopify/types';
import { UpdateBuyerIdentityFormValues, UpdateBuyerIdentitySchema, UpdateDeliveryAttributesFormSchema, UpdateDeliveryAttributesFormValues, UpdatePickupAttributesFormSchema, UpdatePickupAttributesFormValues } from '../lib/zod/shopify';
import { validateForm } from '../utils/zod';
import { getZapietId } from '../utils/zapiet';
import { formatZip } from '../utils/zip';
import { FormErrors } from '../types/form';

export async function addItem(selectedVariantId: string | undefined, quantity: number = 1): Promise<Cart | null> {
  let cart = await getCart()

  if (!cart) {
    cart = await createCart();
    cookies().set('cartId', cart.id);
  }

  if (!selectedVariantId) {
    return cart;
  }

  try {
    cart = await addToCart(cart.id, [{ merchandiseId: selectedVariantId, quantity }]);
    revalidateTag(TAGS.cart);
    return cart;
  } catch (e) {
    console.error('Error adding item to cart', e);
    return cart;
  }
}

export async function removeItem(prevState: any, lineId: string) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  try {
    await removeFromCart(cartId, [lineId]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  payload: {
    lineId: string;
    variantId: string;
    quantity: number;
  }
): Promise<Cart | null> {
  let cart: Cart | null = null;
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return cart;
  }

  const { lineId, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      cart = await removeFromCart(cartId, [lineId]);
      revalidateTag(TAGS.cart);
      return cart;
    }

    cart = await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity
      }
    ]);
    revalidateTag(TAGS.cart);
    return cart;
  } catch (e) {
    console.error('Error updating item quantity', e);
    return cart;
  }
}

export async function updateAttributes(
  values: UpdatePickupAttributesFormValues | UpdateDeliveryAttributesFormValues
) {
  let attributes: ShopifyCartAttribute[] = [];

  if (values.checkoutMethod === 'delivery') {
    const { errors, data } = validateForm(UpdateDeliveryAttributesFormSchema, values);
    if (errors || !data) return { errors };
    attributes = [
      {
        key: "Checkout-Method",
        value: data.checkoutMethod
      },
      {
        key: "Delivery-Location-Id",
        value: data.locationId
      },
      {
        key: "Delivery-Day",
        value: data.deliveryDay
      },
      {
        key: "Delivery-Date",
        value: data.deliveryDate
      },
      {
        key: "Delivery-Time",
        value: data.deliveryTime
      },
      {
        key: "Delivery-Slot-Id",
        value: data.deliverySlotId
      },
    ]

  } else if (values.checkoutMethod === 'pickup') {
    const { errors, data } = validateForm(UpdatePickupAttributesFormSchema, values);
    if (errors || !data) return { errors };

    attributes = [
      {
        key: "Checkout-Method",
        value: data.checkoutMethod
      },
      {
        key: "Pickup-Location-Id",
        value: data.locationId
      },
      {
        key: "Pickup-Location-Company",
        value: data.locationCompany
      },
      {
        key: "Pickup-Location-Address-Line-1",
        value: data.locationAdressLine1
      },
      {
        key: "Pickup-Location-Address-Line-2",
        value: data.locationAdressLine2
      },
      {
        key: "Pickup-Location-City",
        value: data.locationCity
      },
      {
        key: "Pickup-Location-Region",
        value: data.locationRegion
      },
      {
        key: "Pickup-Location-Postal-Code",
        value: data.locationPostalCode
      },
      {
        key: "Pickup-Location-Country",
        value: data.locationCountry
      },
      {
        key: "Pickup-Date",
        value: data.pickupDate
      },
      {
        key: "Pickup-Time",
        value: data.pickupTime
      },
    ]
  } else {
    return { errors: { "checkoutMethod": 'Invalid checkout method' } }
  }

  let cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return { errors: { "root.": 'Missing cart ID' } }
  }

  const filteredAttributes = attributes.filter((attr) => attr.value)

  try {
    const cart = await getCart();

    if (!cart) {
      return { errors: { "root.": 'Cart could not be found.' } }
    }

    const firstLineItem = cart.lines[0]

    let _ZapietId;

    if (values.checkoutMethod === 'delivery') {
      _ZapietId = getZapietId({
        date: values.deliveryDate,
        start_time: values.deliveryTime,
        location_id: parseInt(values.locationId),
        method: values.checkoutMethod
      })
    } else if (values.checkoutMethod === 'pickup') {
      _ZapietId = getZapietId({
        date: values.pickupDate,
        start_time: values.pickupTime,
        location_id: parseInt(values.locationId),
        method: values.checkoutMethod
      })
    } else {
      return { errors: { "checkoutMethod": 'Invalid checkout method' } }
    }

    await updateCartLines(cartId, [
      {
        id: firstLineItem.id,
        merchandiseId: firstLineItem.merchandise.id,
        quantity: firstLineItem.quantity,
        attributes: [{ key: "_ZapietId", value: _ZapietId }]
      }
    ]);

    const res = await updateCartAttributes(cartId, filteredAttributes);
    revalidateTag(TAGS.cart);
    return { data: res }
  } catch (e) {
    return {
      errors: { "root.": 'Error updating attributes' }
    };
  }
}

export async function updateBuyerIdentity(
  prevState: any,
  formData: any,
) {
  let errors: FormErrors<UpdateBuyerIdentityFormValues> = {}

  const result = UpdateBuyerIdentitySchema.safeParse({
    zip: formData.get('zip')
  })

  if (!result.success) {
    result.error.issues.forEach(issue => {
      errors = { ...errors, [issue.path[0]]: issue.message }
    })

    return { errors }
  }

  const zip = formData.get('zip')

  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    errors = { ...errors, "root.cart ": "Missing cart ID" }
    return { errors }
  }

  const formatedZip = formatZip(zip);

  try {
    await updateCartBuyerIdentity(cartId,
      {
        deliveryAddressPreferences: [{
          deliveryAddress: {
            zip: formatedZip,
            country: "SE"
          }
        }]
      }
    );

    revalidateTag(TAGS.cart);
  } catch (e) {
    errors = { ...errors, "root.cart": "Error updating buery identity" }
    return { errors }
  }
}
