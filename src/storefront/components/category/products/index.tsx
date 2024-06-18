import { Suspense } from "react";
import { CategoryProductGrid } from "./grid";
import { ProductGridSkeleton } from "@/storefront/components/common/product-grid/skeleton";

export function CategoryProducts({ id }: { id: string }) {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <CategoryProductGrid id={id} />
    </Suspense>
  );
}
