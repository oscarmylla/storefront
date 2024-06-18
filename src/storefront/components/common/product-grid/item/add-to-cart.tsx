"use client";

import React from "react";
import { Cart } from "@/storefront/lib/shopify/types";
import { Loader2, Minus, Plus } from "lucide-react";
import {
  ButtonProps,
  Button as UIButton,
} from "@/storefront/components/ui/button";
import { AddToCartWrapper } from "../../add-to-cart";
import { cn } from "@/storefront/lib/utils";

function Button({ className, ...props }: ButtonProps) {
  return (
    <UIButton
      {...props}
      size="icon"
      className={cn("rounded-full", className)}
    />
  );
}

export function ProductGridItemAddToCart({
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
    <div className="flex justify-end">
      <AddToCartWrapper
        selectedVariantId={selectedVariantId}
        cart={cart}
        quantityAvailable={quantityAvailable}
      >
        {({ increment, decrement, optimisticQuantity, loading }) => {
          if (!availableForSale) {
            return (
              <Button disabled>
                <Plus className="size-4" />
              </Button>
            );
          }

          if (optimisticQuantity === 0) {
            return (
              <Button onClick={increment} disabled={loading}>
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Plus className="size-4" />
                )}
              </Button>
            );
          }

          return (
            <div className="flex">
              <Button
                onClick={decrement}
                className="rounded-r-none"
                variant="outline"
              >
                <Minus className="size-4" />
              </Button>
              <span className="flex items-center text-center justify-center w-10 border border-x-0">
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>{optimisticQuantity}</>
                )}
              </span>
              <Button
                onClick={increment}
                className="rounded-l-none"
                variant="outline"
              >
                <Plus className="size-4" />
              </Button>
            </div>
          );
        }}
      </AddToCartWrapper>
    </div>
  );
}
