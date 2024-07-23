import { AddToCart } from "@/storefront/components/common/add-to-cart";
import Price from "@/storefront/components/price";
import { Badge } from "@/storefront/components/ui/badge";
import { UnitPrice } from "@/storefront/components/unit-price";
import { Product } from "@/storefront/lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function SearchItem({ product }: { product: Product }) {
  const { title, featuredImage, variants, handle, vendor } = product;
  const selectedVariant = variants[0];

  return (
    <div className="flex gap-4 flex-1">
      {featuredImage && (
        <Link href={`/products/${handle}`}>
          <Image
            src={featuredImage.url}
            alt={featuredImage.altText ?? title}
            className="size-[4.5rem] rounded-lg"
            width={200}
            height={200}
          />
        </Link>
      )}
      <div className="flex-1">
        <Link href={`/products/${handle}`}>
          <span className="font-semibold block md:text-sm">{title}</span>
          <span className="text-muted-foreground block pb-1 md:text-sm">
            400g
          </span>
        </Link>
        <div className="flex">
          <Link
            className="flex gap-2 items-center flex-1"
            href={`/products/${handle}`}
          >
            <Price
              amount={selectedVariant.price.amount}
              currencyCode={selectedVariant.price.currencyCode}
              className="font-bold text-base"
            />
            {selectedVariant.unitPrice &&
              selectedVariant.unitPriceMeasurement && (
                <UnitPrice
                  amount={selectedVariant.unitPrice.amount}
                  currencyCode={selectedVariant.unitPrice.currencyCode}
                  quantityUnit={
                    selectedVariant.unitPriceMeasurement.quantityUnit
                  }
                  className="text-sm text-muted-foreground pt-1"
                />
              )}
          </Link>
          <AddToCart
            selectedVariantId={selectedVariant.id}
            availableForSale={selectedVariant.availableForSale}
            className="ml-auto mt-auto"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
