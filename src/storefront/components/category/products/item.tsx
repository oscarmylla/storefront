import { Product } from "@/sanity.types";
import {
  getCart,
  getProduct,
  getProductAvailability,
} from "@/storefront/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CategoryProductsAddToCart } from "./add-to-cart";
import { sleep } from "@/storefront/lib/utils";

export async function CategoryGridItem({ product }: { product: Product }) {
  const { store } = product;

  if (!store) return null;

  const { title, descriptionHtml, previewImageUrl, slug } = store;

  if (!slug?.current) return null;

  const shopifyProduct = await getProductAvailability(slug.current);
  const cart = await getCart();

  const selectedVariant = shopifyProduct?.variants[0];
  const selectedVariantId = selectedVariant?.id;
  const selectedVariantQuantityAvailable = selectedVariant?.quantityAvailable;

  return (
    <div>
      <Link href={`/products/${slug?.current}`}>
        <div className="aspect-square relative">
          {previewImageUrl ? (
            <Image
              src={previewImageUrl}
              alt={title ?? "Product image"}
              fill
              className="object-cover"
            />
          ) : null}
        </div>
        <h2>{title}</h2>
      </Link>
      {selectedVariantId && (
        <CategoryProductsAddToCart
          selectedVariantId={selectedVariantId}
          cart={cart}
          availableForSale={shopifyProduct?.availableForSale}
          quantityAvailable={selectedVariantQuantityAvailable}
        />
      )}
    </div>
  );
}

export function CategoryGridItemSkeleton() {
  return (
    <div>
      <div className="aspect-square bg-gray-200 animate-pulse"></div>
      <div className="h-4 bg-gray-200 animate-pulse"></div>
    </div>
  );
}
