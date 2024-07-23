"use client";

import React from "react";
import { Cart, CartItem } from "../../lib/shopify/types";
import Link from "next/link";
import Image from "next/image";
import { DEFAULT_OPTION } from "../../lib/constants";
import Price from "@/storefront/components/price";
import { cn } from "@/storefront/lib/utils";
import { EditItemQuantityButton } from "../layout/cart/edit-item-quantity-button";

export function OrderSummary({ cart }: { cart: Cart }) {
  return (
    <div className="min-w-0 flex-1 space-y-3 md:space-y-5">
      <h2 className="text-xl md:text-2xl">Beställning</h2>
      <div className="bg-muted rounded-md border">
        <ul className="space-y-2 p-5">
          {cart.lines.map((item) => (
            <LineItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function LineItem({ item }: { item: CartItem }) {
  return (
    <li
      key={item.id}
      className="bg-background flex w-full flex-col rounded-md px-4 py-3"
    >
      <div className="relative flex w-full flex-row justify-between">
        <div className="z-30 flex flex-row space-x-4">
          <div className="group relative h-16 w-16 overflow-hidden rounded-md border">
            <Link href={`/products/${item.merchandise.product.handle}`}>
              {item.merchandise.product.featuredImage ? (
                <Image
                  className="h-full w-full object-cover"
                  width={64}
                  height={64}
                  alt={
                    item.merchandise.product.featuredImage.altText ||
                    item.merchandise.product.title
                  }
                  src={item.merchandise.product.featuredImage.url}
                />
              ) : (
                <div className="bg-muted h-full w-full" />
              )}
            </Link>
          </div>

          <div className="group/parent flex flex-1 flex-col text-base">
            <h3 className="group-[:hover+&]/parent:text-heading-secondary hover:text-heading-secondary mb-2 text-sm font-medium leading-tight transition-colors">
              <Link href={`/products/${item.merchandise.product.handle}`}>
                {item.merchandise.product.title}
              </Link>
            </h3>

            {item.merchandise.title !== DEFAULT_OPTION ? (
              <p className="text-muted-foreground text-xs">
                {item.merchandise.title}
              </p>
            ) : null}

            {item.merchandise?.unitPrice &&
            item.merchandise.unitPriceMeasurement ? (
              <div className="text-muted-foreground text-sm">
                <Price
                  amount={item.merchandise.unitPrice.amount}
                  currencyCode={item.merchandise.unitPrice.currencyCode}
                />
                <span>
                  /
                  {item.merchandise.unitPriceMeasurement.referenceUnit.toLowerCase()}
                </span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="ml-4 flex h-16 flex-col justify-between">
          <div className="flex justify-end gap-1.5">
            {item.cost.compareAtAmountPerQuantity ? (
              <Price
                amount={(
                  parseInt(item.cost.compareAtAmountPerQuantity.amount) *
                  item.quantity
                ).toString()}
                currencyCode={item.cost.compareAtAmountPerQuantity.currencyCode}
                className={cn("text-sm", {
                  "text-muted-foreground line-through":
                    !!item.cost.compareAtAmountPerQuantity,
                })}
              />
            ) : null}
            <Price
              amount={(
                parseInt(item.cost.amountPerQuantity.amount) * item.quantity
              ).toString()}
              currencyCode={item.cost.amountPerQuantity.currencyCode}
              className="text-sm"
            />
          </div>
          <div className="ml-auto flex h-9 flex-row items-center rounded-md border">
            <EditItemQuantityButton item={item} type="minus" />
            <p className="w-6 text-center">
              <span className="w-full text-sm">{item.quantity}</span>
            </p>
            <EditItemQuantityButton item={item} type="plus" />
          </div>
        </div>
      </div>
    </li>
  );
}
