import { AddToCart } from "@/storefront/components/common/add-to-cart";
import { Product } from "@/storefront/lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function SearchItem({ product }: { product: Product }) {
  const { title, featuredImage, variants, availableForSale, handle } = product;

  return (
    <div className="flex gap-3 flex-1 items-center">
      <Link
        href={`/products/${handle}`}
        className="flex-1 flex items-center gap-3"
      >
        {featuredImage && (
          <Image
            src={featuredImage.url}
            alt={featuredImage.altText ?? title}
            className="w-8 h-8 rounded-lg"
            width={100}
            height={100}
          />
        )}

        {title}
      </Link>

      <AddToCart
        selectedVariantId={variants[0].id}
        availableForSale={availableForSale}
        className="ml-auto"
        size="sm"
      />
    </div>
  );
}
