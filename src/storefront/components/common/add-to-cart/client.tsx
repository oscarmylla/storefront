"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Cart, ProductVariant } from "@/storefront/lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useOptimistic } from "react";
import { addItem } from "../../../actions/cart";
import { EditForm } from "./edit";
import Increment from "./increment";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  currentQuantity,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  currentQuantity: number | undefined;
}) {
  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        "hover:opacity-90": true,
      })}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      {currentQuantity ?? "Add To Cart"}
    </button>
  );
}

export function ClientAddToCart({
  variants,
  availableForSale,
  cart,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  cart?: Cart;
}) {
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );

  const selectedVariantId = variant?.id || defaultVariantId;

  const currentQuantity =
    cart?.lines.find((line) => line.merchandise.id === selectedVariantId)
      ?.quantity ?? 0;

  const [optimisticQuantity, updateOptimisticQuantity] = useOptimistic<
    number,
    number
  >(currentQuantity, (current, increment) => current + increment);

  const addItemAction = async (
    variantId: string | undefined,
    quantityToAdd: number
  ) => {
    await addItem(variantId);
  };

  const actionWithVariant = async (variantId?: string) => {
    updateOptimisticQuantity(1);
    await addItemAction(variantId, 1);
  };

  const boundActionWithVariant = actionWithVariant.bind(
    null,
    selectedVariantId
  );

  // if (currentQuantity === 0 || optimisticQuantity === 0) {
  //   return (
  //     <form action={boundActionWithVariant}>
  //       <SubmitButton
  //         availableForSale={availableForSale}
  //         selectedVariantId={selectedVariantId}
  //         currentQuantity={optimisticQuantity}
  //       />
  //     </form>
  //   );
  // }

  return (
    <div>
      {/* <EditForm
        variants={variants}
        availableForSale={availableForSale}
        cart={cart}
        optimisticQuantity={optimisticQuantity}
        updateOptimisticQuantity={updateOptimisticQuantity}
        type="plus"
      /> */}
      {optimisticQuantity}
      <Increment
        variants={variants}
        availableForSale={availableForSale}
        cart={cart}
        currentQuantity={currentQuantity}
        type="plus"
      />
    </div>
  );
}
