"use server"

import { TAGS } from '@/storefront/lib/constants';
import { addToCart, createCart, getCart, removeFromCart, updateCart } from '@/storefront/lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { Cart } from '../lib/shopify/types';

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
