import React from "react";
import { VendorBreadcrumb } from "./breadcrumb";
import { VendorProducts } from "./products";
import { PaginatedControls } from "../../common/paginated-products/controls";
import { SortOptions } from "../../common/paginated-products/sort-products";

export function VendorMain({
  vendor,
  order,
}: {
  vendor: string;
  order?: SortOptions;
}) {
  return (
    <section className="py-7 md:py-10 container">
      <div className="space-y-6">
        <div className="space-y-3">
          <VendorBreadcrumb title={vendor} />
          <h1 className="text-3xl tracking-tight lg:text-4xl font-bold">
            {vendor}
          </h1>
        </div>
        <PaginatedControls order={order} />
      </div>
      <VendorProducts vendor={vendor} order={order} />
    </section>
  );
}
