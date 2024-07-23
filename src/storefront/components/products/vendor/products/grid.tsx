import PaginatedProducts from "@/storefront/components/common/paginated-products";
import PaginatedProductsSkeleton from "@/storefront/components/common/paginated-products/skeleton";
import { SortOptions } from "@/storefront/components/common/paginated-products/sort-products";
import { Suspense } from "react";

export async function VendorProductGrid({
  vendor,
  className,
  order,
}: {
  vendor: string;
  className: string;
  order?: SortOptions;
}) {
  return (
    <Suspense fallback={<PaginatedProductsSkeleton />}>
      <PaginatedProducts
        vendorId={vendor}
        className={className}
        page={1}
        order={order}
      />
    </Suspense>
  );
}
