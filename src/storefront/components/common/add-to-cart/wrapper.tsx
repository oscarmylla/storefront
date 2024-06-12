"use client";

import { addItem, updateItemQuantity } from "@/storefront/actions/cart";
import { Cart } from "@/storefront/lib/shopify/types";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type Payload = {
  lineId?: string;
  variantId?: string;
  quantity: number;
};

export default function AddToCartWrapper({
  selectedVariantId,
  cart,
  children,
  delay = 1000,
  quantityAvailable,
}: {
  selectedVariantId: string;
  cart?: Cart;
  children: (props: {
    increment: (diff?: any) => void;
    decrement: (diff?: any) => void;
    optimisticQuantity: number;
    cartQuantity: number;
    loading: boolean;
    quantityAvailable: number;
  }) => React.ReactNode;
  delay?: number;
  quantityAvailable: number;
}) {
  const line = cart?.lines.find(
    (line) => line.merchandise.id === selectedVariantId
  );

  const cartQuantity =
    cart?.lines.find((line) => line.merchandise.id === selectedVariantId)
      ?.quantity ?? 0;

  const [optimisticQuantity, setOptimisticQuantity] = useState(cartQuantity);
  const [loading, setLoading] = useState(false);

  const debounce = useDebouncedCallback(async () => {
    let cart;
    let newLineQuantity = 0;

    setLoading(true);

    const payload: Payload = {
      lineId: line?.id,
      variantId: selectedVariantId,
      quantity: optimisticQuantity,
    };

    if (payload.quantity === cartQuantity || !payload.variantId) {
      return setLoading(false);
    }

    if (!payload.lineId) {
      cart = await addItem(payload.variantId, payload.quantity);
      newLineQuantity =
        cart?.lines.find((line) => line.merchandise.id === payload.variantId)
          ?.quantity ?? 0;
    } else {
      cart = await updateItemQuantity({
        lineId: payload.lineId,
        variantId: payload.variantId,
        quantity: payload.quantity,
      });
      newLineQuantity =
        cart?.lines.find((line) => line.id === payload.lineId)?.quantity ?? 0;
    }

    setLoading(false);
    setOptimisticQuantity(newLineQuantity);
  }, delay);

  useEffect(() => {
    setOptimisticQuantity(cartQuantity);
  }, [cartQuantity]);

  function increment(param: number = 1) {
    let diff = typeof param === "number" ? param : 1;

    setOptimisticQuantity((curr) => curr + diff);
    debounce();
  }

  function decrement(param: number = 1) {
    if (optimisticQuantity === 0) return;

    let diff = typeof param === "number" ? param : 1;

    setOptimisticQuantity((curr) => curr - diff);
    debounce();
  }

  return children({
    increment,
    decrement,
    optimisticQuantity,
    cartQuantity,
    loading,
    quantityAvailable,
  });
}
