"use client";

import { Button } from "@/storefront/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/storefront/components/ui/sheet";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { UpdateZip } from "./update-zip";
import { DeleteZip } from "./delete-zip";

import myllaLogo from "@/public/images/logo.webp";
import { Separator } from "@radix-ui/react-select";
import Link from "next/link";
import { Cart, CartItem } from "../../../lib/shopify/types";
import { DEFAULT_OPTION } from "../../../lib/constants";
import { ScrollArea } from "@/storefront/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import Price from "../../price";
import { cn } from "@/storefront/lib/utils";
import OpenCart from "./open-cart";
import { AddToCart } from "../../common/add-to-cart";

export type MerchandiseSearchParams = {
  [key: string]: string;
};

interface CartSheetProps {
  cart: Cart | undefined;
}

export function CartSheet({ cart }: CartSheetProps) {
  const [open, setOpen] = useState(false);

  const zip = cart?.buyerIdentity?.deliveryAddressPreferences?.[0]?.zip;
  const showEmpty = !cart || cart.lines.length === 0;
  const showNotEmpty = !showEmpty && zip;
  const showZip = !zip && !showEmpty;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <OpenCart totalAmount={cart?.cost.totalAmount} />
      </SheetTrigger>
      <SheetContent className="bg-card flex flex-col overflow-auto text-left outline-none p-6">
        {showZip ? (
          <SheetHeader className="my-auto max-w-64 self-center sm:text-center">
            <SheetTitle>Postnummer</SheetTitle>
            <SheetDescription>
              Vänligen fyll i din postnummer nedan för att se om vi levererar
              till dig.
            </SheetDescription>
            <div>
              <UpdateZip />
            </div>
          </SheetHeader>
        ) : (
          <>
            {showEmpty ? (
              <CartEmpty />
            ) : showNotEmpty ? (
              <CartNotEmpty cart={cart} zip={zip} setOpen={setOpen} />
            ) : null}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartEmpty() {
  return (
    <SheetHeader className="my-auto sm:text-center">
      <SheetTitle>Varukorg</SheetTitle>
      <SheetDescription>
        Din varukorg är tom. Lägg till något gott för att se din varukorg.
      </SheetDescription>
    </SheetHeader>
  );
}

function CartNotEmpty({
  cart,
  zip,
  setOpen,
}: {
  cart: Cart;
  zip: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <SheetHeader className="sm:text-center">
        <SheetTitle>Varukorg</SheetTitle>
        <SheetDescription>
          Du har valt postnummer{" "}
          <span className="text-foreground font-medium">{zip}</span>.
          <span className="mt-1 block">Vi levererar till dig!</span>
        </SheetDescription>
        <DeleteZip />
      </SheetHeader>
      <ScrollArea className="-mr-2 min-h-10 pr-2">
        <ul>
          {cart.lines.map((item, index) => {
            if (item.quantity === 0) return null;

            return (
              <CartLine
                index={index}
                item={item}
                setOpen={setOpen}
                key={item.id}
              />
            );
          })}
        </ul>
      </ScrollArea>
      <SheetFooter className="mt-auto">
        <div className="space-y-4 sm:flex-col flex-1">
          <Separator className="border-b" />
          <CartSummary cart={cart} setOpen={setOpen} />
        </div>
      </SheetFooter>
    </>
  );
}

function CartLine({
  item,
  index,
  setOpen,
}: {
  item: CartItem;
  index: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <li key={index} className="flex w-full flex-col border-b last:border-b-0">
      <div className="relative flex w-full flex-row justify-between px-1 py-4">
        <div className="z-30 flex flex-row space-x-4">
          <div className="group relative h-16 w-16 overflow-hidden rounded-md border">
            <Link
              href={`/products/${item.merchandise.product.handle}`}
              onClick={() => setOpen(false)}
            >
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
              <Link
                href={`/products/${item.merchandise.product.handle}`}
                onClick={() => setOpen(false)}
              >
                {item.merchandise.product.title}
              </Link>
            </h3>

            {item.merchandise.title !== DEFAULT_OPTION ? (
              <p className="text-muted-foreground text-xs">
                {item.merchandise.title}
              </p>
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
          <AddToCart
            selectedVariantId={item.merchandise.id}
            availableForSale={item.merchandise.availableForSale}
            size="sm"
          />
        </div>
      </div>
    </li>
  );
}

function CartSummary({
  cart,
  setOpen,
}: {
  cart: Cart;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <p>Frakt</p>
          <p className="text-right">Beräknas i kassan</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Totalt</p>
          <Price
            className="text-right"
            amount={cart.cost.subtotalAmount.amount}
            currencyCode={cart.cost.subtotalAmount.currencyCode}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button asChild variant="default">
          <Link href="/cart" onClick={() => setOpen(false)}>
            Till varukorgen
          </Link>
        </Button>
        <SheetClose asChild>
          <Button variant="outline">Fortsätt handla</Button>
        </SheetClose>
      </div>
    </>
  );
}
