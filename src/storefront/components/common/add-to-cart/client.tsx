"use client";

import React from "react";
import { Loader2, Minus, Plus } from "lucide-react";
import { AddToCartWrapper } from "./wrapper";
import { AddToCartButton } from "./button";
import { ButtonProps } from "../../ui/button";
import { useCart } from "@/storefront/providers/cart";

export function AddToCartClient({
  selectedVariantId,
  availableForSale,
  quantityAvailable = 1000,
  size = "icon",
}: {
  selectedVariantId: string;
  availableForSale?: boolean;
  quantityAvailable?: number;
  size?: ButtonProps["size"];
}) {
  const cart = useCart();

  return (
    <AddToCartWrapper
      selectedVariantId={selectedVariantId}
      cart={cart}
      quantityAvailable={quantityAvailable}
    >
      {({ increment, decrement, optimisticQuantity, loading }) => {
        if (!availableForSale) {
          return (
            <AddToCartButton disabled size={size}>
              {size === "icon" || size === "sm" ? (
                <Plus className="size-5" />
              ) : (
                <>
                  <Plus className="size-5" />
                  Slutsåld
                </>
              )}
            </AddToCartButton>
          );
        }

        if (optimisticQuantity === 0) {
          return (
            <AddToCartButton onClick={increment} disabled={loading} size={size}>
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : size === "icon" || size === "sm" ? (
                <Plus className="size-5" />
              ) : (
                <>
                  <Plus className="size-5" />
                  Lägg till i varukorgen
                </>
              )}
            </AddToCartButton>
          );
        }

        return (
          <div className="flex">
            <AddToCartButton
              onClick={decrement}
              className="rounded-r-none"
              variant="outline"
              size={size === "sm" ? size : "icon"}
            >
              <Minus className="size-4" />
            </AddToCartButton>
            <span className="flex items-center text-center justify-center w-10 shrink-0 border border-x-0 bg-background">
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>{optimisticQuantity}</>
              )}
            </span>
            <AddToCartButton
              onClick={increment}
              className="rounded-l-none"
              variant="outline"
              size={size === "sm" ? size : "icon"}
            >
              <Plus className="size-5" />
            </AddToCartButton>
          </div>
        );
      }}
    </AddToCartWrapper>
  );
}
