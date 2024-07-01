import { Money } from "@/storefront/lib/shopify/types";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Price from "@/storefront/components/price";
import { Button } from "../../ui/button";

export default function OpenCart({
  className,
  totalAmount,
  ...props
}: {
  className?: string;
  totalAmount?: Money;
}) {
  return (
    <Button
      aria-label="Open cart"
      className="rounded-full flex items-center gap-2 border"
      variant="secondary"
      {...props}
    >
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
    </Button>
  );
}
