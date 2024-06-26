import { Suspense } from "react";
import { AddToCartServer } from "./server";
import { Loader2 } from "lucide-react";
import { ButtonProps } from "../../ui/button";
import { cn } from "@/storefront/lib/utils";

export async function AddToCart(props: {
  selectedVariantId: string;
  availableForSale?: boolean;
  quantityAvailable?: number;
  size?: ButtonProps["size"];
  className?: string;
}) {
  return (
    <div className={cn("flex justify-end", props.className)}>
      <Suspense fallback={<Loader2 className="size-7" />}>
        <AddToCartServer {...props} />
      </Suspense>
    </div>
  );
}
