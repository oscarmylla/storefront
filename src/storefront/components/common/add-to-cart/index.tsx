import { getCart } from "@/storefront/lib/shopify";
import React from "react";
import { ClientAddToCart } from "./client";
import { ProductVariant } from "@/storefront/lib/shopify/types";

export async function AddToCart({
  variants,
  availableForSale,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const cart = await getCart();

  return (
    <div>
      <ClientAddToCart
        variants={variants}
        availableForSale={availableForSale}
        cart={cart}
      />
    </div>
  );
}
