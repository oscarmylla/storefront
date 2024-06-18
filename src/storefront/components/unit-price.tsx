import { cn } from "../lib/utils";

export const UnitPrice = ({
  amount,
  className,
  currencyCode = "SEK",
  quantityUnit,
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  quantityUnit: string;
} & React.ComponentProps<"p">) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
      minimumFractionDigits: 0,
    }).format(parseFloat(amount))}`}
    /{quantityUnit.toLowerCase()}
  </p>
);
