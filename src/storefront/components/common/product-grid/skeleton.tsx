import { cn } from "@/storefront/lib/utils";
import { productGridClasses } from ".";
import { ProductGridItemSkeleton } from "./item/skeleton";

export function ProductGridSkeleton({ className }: { className?: string }) {
  return (
    <ul className={cn(productGridClasses, className)}>
      {[...Array(8)].map((_, i) => (
        <ProductGridItemSkeleton key={i} />
      ))}
    </ul>
  );
}
