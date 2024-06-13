"use client";

import { addItem, updateItemQuantity } from "@/storefront/actions/cart";
import { updateCart } from "@/storefront/lib/shopify";
import { Cart, ProductVariant } from "@/storefront/lib/shopify/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type Payload = {
  lineId?: string;
  variantId?: string;
  quantity: number;
};

export default function Increment({
  variants,
  availableForSale,
  cart,
  currentQuantity,
  type,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  cart?: Cart;
  currentQuantity: number;
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

  const [optimisticQuantity, setOptimisticQuantity] = useState(currentQuantity);
  const handleIncrement = useDebouncedCallback(async (quantity) => {
    let cart;

    const payload: Payload = {
      lineId: line?.id,
      variantId: selectedVariantId,
      quantity: type === "plus" ? quantity + 1 : quantity - 1,
    };

    if (payload.quantity === currentQuantity || !payload.variantId) return;

    if (!payload.lineId) {
      cart = await addItem(payload.variantId, payload.quantity);
    } else {
      cart = await updateItemQuantity({
        lineId: payload.lineId,
        variantId: payload.variantId,
        quantity: payload.quantity,
      });
    }

    const updatedLine = cart?.lines.find((line) => line.id === payload.lineId);

    setOptimisticQuantity(updatedLine?.quantity ?? 0);
  }, 1000);

  useEffect(() => {
    setOptimisticQuantity(currentQuantity);
  }, [currentQuantity]);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <button
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        onClick={() => {
          setOptimisticQuantity((curr) =>
            type === "plus" ? curr + 1 : curr - 1
          );
          handleIncrement(optimisticQuantity);
        }}
      >
        {optimisticQuantity}
      </button>
    </div>
  );
}
