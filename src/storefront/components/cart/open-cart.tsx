import { Money } from "@/storefront/lib/shopify/types";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Price from "../price";

export default function OpenCart({
  className,
  totalAmount,
}: {
  className?: string;
  totalAmount?: Money;
}) {
  return (
    <>
      <ShoppingCartIcon
        className={clsx(
          "h-4 transition-all ease-in-out hover:scale-110 ",
          className
        )}
      />

      {totalAmount ? (
        <Price
          amount={totalAmount.amount}
          currencyCode={totalAmount.currencyCode}
          className="text-secondary-foreground"
          minimumFractionDigits={2}
        />
      ) : null}
    </>
  );
}
