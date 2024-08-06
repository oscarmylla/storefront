import { PaginatedProductsQueryTemplateResult } from "@/sanity.types";
import { Suspense } from "react";
import { ProductGridItem } from "./item";
import { ProductGridItemSkeleton } from "./item/skeleton";
import { cn } from "@/storefront/lib/utils";

export const productGridClasses =
  "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5";

export function ProductGrid({
  products,
  className,
}: {
  products: PaginatedProductsQueryTemplateResult["products"];
  className?: string;
}) {
  if (products.length === 0)
    return (
      <div className="col-span-4 text-center py-20">
        <p>Inga produkter hittades.</p>
      </div>
    );

  return (
    <ul className={cn(productGridClasses, className)}>
      {products.map((product) => (
        <Suspense key={product._id} fallback={<ProductGridItemSkeleton />}>
          <ProductGridItem product={product} />
        </Suspense>
      ))}
    </ul>
  );
}
