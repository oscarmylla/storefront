import { Suspense } from "react";
import { ProductGridSkeleton } from "@/storefront/components/common/product-grid/skeleton";
import { VendorProductGrid } from "./grid";
import { SortOptions } from "@/storefront/components/common/paginated-products/sort-products";

export function VendorProducts({
  vendor,
  order,
}: {
  vendor: string;
  order?: SortOptions;
}) {
  return (
    <Suspense fallback={<ProductGridSkeleton className="py-10" />}>
      <VendorProductGrid vendor={vendor} className="py-10" order={order} />
    </Suspense>
  );
}
