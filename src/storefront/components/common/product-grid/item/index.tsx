import {
  PaginatedProductsQueryTemplateResult,
  ShopifyProduct,
} from "@/sanity.types";
import Link from "next/link";
import React from "react";
import { ProductGridItemImage } from "./image";
import Price from "@/storefront/components/price";
import { Badge } from "@/storefront/components/ui/badge";
import { AddToCart } from "../../add-to-cart";

export async function ProductGridItem({
  product,
}: {
  product: Omit<
    PaginatedProductsQueryTemplateResult["products"][number],
    "store"
  > & {
    store?: ShopifyProduct | null;
  };
}) {
  const { store, variant } = product;

  if (!store || !variant) return null;

  const selectedVariantId = variant.gid;
  const { title, previewImageUrl, slug, vendor } = store;

  if (!slug?.current || !selectedVariantId) return null;

  const isAvailable = !!variant.inventory?.isAvailable;

  return (
    <li className="rounded-xl overflow-hidden shadow-sm flex flex-col bg-background h-full">
      <Link href={`/products/${slug?.current}`} className="relative">
        <div className="absolute top-1.5 left-1.5 right-1.5 z-10">
          {!isAvailable && (
            <Badge variant="secondary" className="font-medium bg-amber-100">
              Slutsåld
            </Badge>
          )}
        </div>
        <div className="absolute bottom-2 left-0 right-0 z-10 text-center">
          {vendor && (
            <Badge variant="secondary" className="font-medium">
              {vendor}
            </Badge>
          )}
        </div>
        <ProductGridItemImage previewImageUrl={previewImageUrl} title={title} />
      </Link>
      <div className="p-3 sm:p-4 flex-1 flex flex-col gap-1 pt-2 sm:pt-3">
        <Link
          href={`/products/${slug?.current}`}
          className="space-y-2 md:space-y-3 mb-auto"
        >
          <div className="space-y-0.5">
            <h2 className="font-semibold text-sm sm:text-[0.95rem]">{title}</h2>
            <p className="text-sm text-muted-foreground">Sverige 270g</p>
          </div>

          <div>
            <Price amount={variant.price} className="font-semibold" />
            {/* {selectedVariant.unitPrice &&
              selectedVariant.unitPriceMeasurement && (
                <UnitPrice
                  amount={selectedVariant.unitPrice.amount}
                  currencyCode={selectedVariant.unitPrice.currencyCode}
                  quantityUnit={
                    selectedVariant.unitPriceMeasurement.quantityUnit
                  }
                  className="text-sm text-muted-foreground"
                />
              )} */}
          </div>
        </Link>
        <AddToCart
          selectedVariantId={selectedVariantId}
          availableForSale={isAvailable}
        />
      </div>
    </li>
  );
}
