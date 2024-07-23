import React, { Suspense } from "react";
import { CollectionBreadcrumb } from "./breadcrumb";
import { Collection } from "@/storefront/lib/shopify/types";
import { CollectionProducts } from "./products";
import PaginatedProductsSkeleton from "../common/paginated-products/skeleton";
import { PaginatedControls } from "../common/paginated-products/controls";
import { SortOptions } from "../common/paginated-products/sort-products";

export default function CollectionMain({
  collection,
  order,
}: {
  collection: Collection;
  order?: SortOptions;
}) {
  return (
    <section className="py-7 md:py-10 container">
      <div className="space-y-6">
        <div className="space-y-3">
          <CollectionBreadcrumb title={collection.title} />
          <h1 className="text-3xl tracking-tight lg:text-4xl font-bold">
            {collection.title}
          </h1>
        </div>
        <PaginatedControls order={order} />
        <Suspense fallback={<PaginatedProductsSkeleton />}>
          <CollectionProducts handle={collection.handle} order={order} />
        </Suspense>
      </div>
    </section>
  );
}
