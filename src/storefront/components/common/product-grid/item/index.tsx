import {
  PaginatedProductsQueryTemplateResult,
  Product,
  ShopifyProduct,
} from "@/sanity.types";
import { getProductAvailability } from "@/storefront/lib/shopify";
import Link from "next/link";
import React from "react";
import { ProductGridItemImage } from "./image";
import Price from "@/storefront/components/price";
import { UnitPrice } from "@/storefront/components/unit-price";
import { Badge } from "@/storefront/components/ui/badge";
import { AddToCart } from "../../add-to-cart";

export async function ProductGridItem({
  product,
}: {
  product: Omit<PaginatedProductsQueryTemplateResult[number], "store"> & {
    store?: ShopifyProduct | null;
  };
}) {
  const { store } = product;

  if (!store) return null;

  const { title, previewImageUrl, slug, vendor } = store;

  if (!slug?.current) return null;

  const shopifyProduct = await getProductAvailability(slug.current);

  if (!shopifyProduct) return null;

  const selectedVariant = shopifyProduct?.variants[0];

  if (!selectedVariant) return null;

  const selectedVariantId = selectedVariant.id;
  const selectedVariantQuantityAvailable = selectedVariant.quantityAvailable;

  return (
    <li className="rounded-xl overflow-hidden shadow-sm flex flex-col bg-background h-full">
      <Link href={`/products/${slug?.current}`} className="relative">
        <div className="absolute top-1.5 left-1.5 right-1.5 z-10">
          {!selectedVariant.availableForSale && (
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
                  className="text-sm text-muted-foreground"
                />
              )}
          </div>
        </Link>
        <AddToCart
          selectedVariantId={selectedVariantId}
          availableForSale={shopifyProduct?.availableForSale}
          quantityAvailable={selectedVariantQuantityAvailable}
        />
      </div>
    </li>
  );
}
