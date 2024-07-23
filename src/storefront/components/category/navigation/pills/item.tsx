import { Button } from "@/storefront/components/ui/button";
import { cn } from "@/storefront/lib/utils";
import Link from "next/link";

export function CategoryNavigationPill({
  isCurrent,
  title,
  product_count,
  href,
}: {
  isCurrent: boolean;
  title?: string;
  product_count: number;
  href: string;
}) {
  return (
    <Button
      variant={isCurrent ? "default" : "outline"}
      asChild
      className={cn(
        "rounded-full text-base gap-1.5 md:text-sm h-11 px-5 md:h-10 md:px-4",
        {
          "text-foreground/90": !isCurrent,
        }
      )}
    >
      <Link href={href}>
        {title}
        <span className="py-0.5 px-2.5 rounded-full bg-muted text-muted-foreground text-xs">
          {product_count}
        </span>
      </Link>
    </Button>
  );
}
