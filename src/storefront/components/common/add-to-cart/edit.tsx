import { addItem, updateItemQuantity } from "@/storefront/actions/cart";
import { Cart, ProductVariant } from "@/storefront/lib/shopify/types";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import React from "react";

type Payload = {
  lineId: string;
  variantId: string;
  quantity: number;
};

export function EditForm({
  variants,
  availableForSale,
  cart,
  optimisticQuantity,
  updateOptimisticQuantity,
  type,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  cart?: Cart;
  optimisticQuantity: number;
  updateOptimisticQuantity: (quantity: number) => void;
  type: "plus" | "minus";
}) {
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );

  const selectedVariantId = variant?.id || defaultVariantId;

  const line = cart?.lines.find(
    (line) => line.merchandise.id === selectedVariantId
  );

  if (!line || !selectedVariantId) {
    return null;
  }

  const payload: Payload = {
    lineId: line.id,
    variantId: selectedVariantId,
    quantity: type === "plus" ? optimisticQuantity + 1 : optimisticQuantity - 1,
  };

  const editItemAction = async (payload: Payload) => {
    await updateItemQuantity(payload);
  };

  const actionWithVariant = async (payload: Payload) => {
    updateOptimisticQuantity(type === "plus" ? 1 : -1);
    await editItemAction(payload);
  };

  const boundActionWithVariant = actionWithVariant.bind(null, payload);

  return (
    <form action={boundActionWithVariant}>
      {type === "plus" ? (
        <button type="submit">
          <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
        </button>
      ) : (
        <button type="submit">
          <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
        </button>
      )}
    </form>
  );
}
