import React from "react";
import Price from "../../price";
import { UnitPrice } from "../../unit-price";
import { AddToCart } from "../../common/add-to-cart";
import { Category, Product } from "@/sanity.types";
import {
  Product as ShopifyProduct,
  ProductVariant,
} from "@/storefront/lib/shopify/types";

export function ProductActions({
  product,
  shopifyProduct,
  selectedVariant,
}: {
  product: Omit<Product, "categoryPath"> & { categoryPath: Category[] | null };
  shopifyProduct: ShopifyProduct;
  selectedVariant: ProductVariant;
}) {
  const { title, priceRange } = shopifyProduct;
  const { store } = product;

  return (
    <div className="space-y-4 md:space-y-7">
      <div className="space-y-1 md:space-y-2">
        {store?.vendor && (
          <span className="text-sm uppercase text-muted-foreground">
            {store.vendor}
          </span>
        )}
        <h1 className="font-semibold text-xl md:text-3xl">{title}</h1>
        <p className="text-muted-foreground md:text-xl">Sverige 270g</p>
      </div>
      <div className="space-y-1 md:space-y-2">
        <Price
          amount={priceRange.maxVariantPrice.amount}
          currencyCode={priceRange.maxVariantPrice.currencyCode}
          className="text-2xl text-[1.7rem] font-semibold md:text-4xl"
        />
        {selectedVariant.unitPrice && selectedVariant.unitPriceMeasurement && (
          <UnitPrice
            amount={selectedVariant.unitPrice.amount}
            currencyCode={selectedVariant.unitPrice.currencyCode}
            quantityUnit={selectedVariant.unitPriceMeasurement.quantityUnit}
            className="text-sm text-muted-foreground md:text-base"
          />
        )}
      </div>
      <AddToCart
        selectedVariantId={selectedVariant.id}
        availableForSale={selectedVariant.availableForSale}
        size="lg"
        className="justify-start"
      />
    </div>
  );
}
