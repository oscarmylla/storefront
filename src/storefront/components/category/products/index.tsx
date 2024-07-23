import { Suspense } from "react";
import PaginatedProducts from "../../common/paginated-products";
import PaginatedProductsSkeleton from "../../common/paginated-products/skeleton";
import { SortOptions } from "../../common/paginated-products/sort-products";

export function CategoryProducts({
  id,
  order,
}: {
  id: string;
  order?: SortOptions;
}) {
  return (
    <Suspense fallback={<PaginatedProductsSkeleton className="py-10" />}>
      <PaginatedProducts
        categoryId={id}
        className="py-10"
        page={1}
        order={order}
      />
    </Suspense>
  );
}
