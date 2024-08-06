import { ButtonProps } from "../../ui/button";
import { cn } from "@/storefront/lib/utils";
import { AddToCartClient } from "./client";

export function AddToCart(props: {
  selectedVariantId: string;
  availableForSale?: boolean;
  size?: ButtonProps["size"];
  className?: string;
}) {
  return (
    <div className={cn("flex justify-end", props.className)}>
      <AddToCartClient {...props} />
    </div>
  );
}
