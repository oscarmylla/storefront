import { Product } from "@/sanity.types";
import {
  getCart,
  getProduct,
  getProductAvailability,
} from "@/storefront/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProductGridItemAddToCart } from "./add-to-cart";
import { ProductGridItemImage } from "./image";
import Price from "@/storefront/components/price";
import { UnitPrice } from "@/storefront/components/unit-price";

export async function ProductGridItem({ product }: { product: Product }) {
  const { store } = product;

  if (!store) return null;

  const { title, descriptionHtml, previewImageUrl, slug } = store;

  if (!slug?.current) return null;

  const shopifyProduct = await getProductAvailability(slug.current);
  const cart = await getCart();

  if (!shopifyProduct) return null;

  const selectedVariant = shopifyProduct?.variants[0];

  if (!selectedVariant) return null;

  const selectedVariantId = selectedVariant.id;
  const selectedVariantQuantityAvailable = selectedVariant.quantityAvailable;

  return (
    <li className="rounded-md overflow-hidden shadow-md flex flex-col">
      <Link href={`/products/${slug?.current}`} scroll={false}>
        <ProductGridItemImage previewImageUrl={previewImageUrl} title={title} />
      </Link>
      <div className="py-3.5 px-3 sm:px-5 flex-1 flex flex-col">
        <Link
          href={`/products/${slug?.current}`}
          scroll={false}
          className="space-y-2 mb-auto"
        >
          <div>
            <h2 className="font-semibold">{title}</h2>
            <p>Sverige 270g</p>
          </div>

          <div>
            <Price
              amount={selectedVariant.price.amount}
              currencyCode={selectedVariant.price.currencyCode}
              className="font-semibold"
            />
            {selectedVariant.unitPrice &&
              selectedVariant.unitPriceMeasurement && (
                <UnitPrice
                  amount={selectedVariant.unitPrice.amount}
                  currencyCode={selectedVariant.unitPrice.currencyCode}
                  quantityUnit={
                    selectedVariant.unitPriceMeasurement.quantityUnit
                  }
                />
              )}
          </div>
        </Link>
        <ProductGridItemAddToCart
          selectedVariantId={selectedVariantId}
          cart={cart}
          availableForSale={shopifyProduct?.availableForSale}
          quantityAvailable={selectedVariantQuantityAvailable}
        />
      </div>
    </li>
  );
}
