import React from "react";
import { CartSupplementsVendor } from "./vendor";
import { CartSupplementsCollection } from "./collection";
import { Button } from "@/storefront/components/ui/button";
import Link from "next/link";
import { Cart } from "@/storefront/lib/shopify/types";

export function CartSupplements({ cart }: { cart: Cart }) {
  const diff = 500 - parseInt(cart.cost.subtotalAmount.amount);
  const hasDiff = diff > 0;

  return (
    <div className="container pb-10 pt-8 md:pb-20 md:pt-8">
      <div className="mb-8 text-center md:mb-16">
        <h1 className=" mb-3 text-2xl md:text-3xl">
          {hasDiff
            ? "Ditt ordervärde är för lågt!"
            : "Du är redo att beställa!"}
        </h1>
        <p className="text-foreground/85 mx-auto mb-5 max-w-2xl text-sm sm:text-base">
          {hasDiff
            ? "Ditt ordervärde är för närvarande för lågt för att vi ska kunna leverera till dig. Lägg till något gott för att nå minimibeloppet."
            : "Du har nu nått minimibeloppet för att vi ska kunna leverera till dig. Klicka på knappen nedan för att gå vidare till kassan."}
        </p>
        <Button asChild>
          {hasDiff ? (
            <span>Kvar till leverans: {diff} kr</span>
          ) : (
            <Link href="/cart">Gå till kassan</Link>
          )}
        </Button>
      </div>
      <div className="space-y-12">
        <CartSupplementsVendor />
        <CartSupplementsCollection />
      </div>
    </div>
  );
}
