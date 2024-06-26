import { getCart } from "@/storefront/lib/shopify";
import { AddToCartClient } from "./client";
import { ButtonProps } from "../../ui/button";

export async function AddToCartServer(props: {
  selectedVariantId: string;
  availableForSale?: boolean;
  quantityAvailable?: number;
  size?: ButtonProps["size"];
}) {
  const cart = await getCart();

  return <AddToCartClient {...props} cart={cart} />;
}
