import { Suspense } from "react";
import { CategoryProductGrid } from "./grid";
import { ProductGridSkeleton } from "@/storefront/components/common/product-grid/skeleton";

export function CategoryProducts({
  id,
  order,
}: {
  id: string;
  order?: string;
}) {
  return (
    <Suspense fallback={<ProductGridSkeleton className="py-10" />}>
      <CategoryProductGrid id={id} className="py-10" order={order} />
    </Suspense>
  );
}
