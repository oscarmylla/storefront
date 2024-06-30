const Price = ({
  amount,
  className,
  currencyCode = "SEK",
  currencyCodeClassName,
  minimumFractionDigits = 0,
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
  minimumFractionDigits?: number;
} & React.ComponentProps<"p">) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
      minimumFractionDigits,
    }).format(parseFloat(amount))}`}
    {/* <span
      className={clsx("ml-1 inline", currencyCodeClassName)}
    >{`${currencyCode}`}</span> */}
  </p>
);

export default Price;
