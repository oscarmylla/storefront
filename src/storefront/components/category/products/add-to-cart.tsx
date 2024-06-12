"use client";

import React from "react";
import AddToCartWrapper from "../../common/add-to-cart/wrapper";
import { Cart } from "@/storefront/lib/shopify/types";
import { Button } from "../../ui/button";
import { Loader2, Minus, Plus } from "lucide-react";

export function CategoryProductsAddToCart({
  selectedVariantId,
  cart,
  availableForSale,
  quantityAvailable = 1000,
}: {
  selectedVariantId: string;
  cart?: Cart;
  availableForSale?: boolean;
  quantityAvailable?: number;
}) {
  return (
    <div className="flex items-stretch border rounded-lg">
      <AddToCartWrapper
        selectedVariantId={selectedVariantId}
        cart={cart}
        quantityAvailable={quantityAvailable}
      >
        {({ increment, decrement, optimisticQuantity, loading }) => {
          if (!availableForSale) {
            return (
              <Button disabled className="flex-1">
                Slutsåld
              </Button>
            );
          }

          if (optimisticQuantity === 0) {
            return (
              <Button onClick={increment} className="flex-1" disabled={loading}>
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>Lägg till</>
                )}
              </Button>
            );
          }

          return (
            <>
              <Button onClick={decrement} size="icon">
                <Minus className="size-4" />
              </Button>
              <span className="flex items-center flex-1 text-center justify-center">
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>{optimisticQuantity}</>
                )}
              </span>
              <Button onClick={increment} size="icon">
                <Plus className="size-4" />
              </Button>
            </>
          );
        }}
      </AddToCartWrapper>
    </div>
  );
}
