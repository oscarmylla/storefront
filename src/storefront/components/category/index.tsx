import React from "react";
import { CategoryBreadcrumb } from "./breadcrumb";
import { CategoryWithChildrenAndProductCount } from "@/sanity/types/category";
import { Category } from "@/sanity.types";
import { CategoryProducts } from "./products";
import { CategoryNavigation } from "./navigation";
import { PaginatedControls } from "../common/paginated-products/controls";
import { SortOptions } from "../common/paginated-products/sort-products";

export default function CategoryMain({
  params,
  categories,
  category,
  order,
  page,
}: {
  category: Category;
  params: { category: string[] };
  categories: CategoryWithChildrenAndProductCount[];
  order?: SortOptions;
  page?: number;
}) {
  const rootCategory = categories[0];
  return (
    <section>
      <div className="space-y-6">
        <div className="space-y-3">
          <CategoryBreadcrumb categories={categories} slugs={params.category} />
          <h1 className="text-3xl tracking-tight lg:text-4xl font-bold">
            {rootCategory?.title}
          </h1>
        </div>
        <CategoryNavigation categories={categories} slugs={params.category} />
        <PaginatedControls order={order} />
      </div>
      <CategoryProducts id={category._id} order={order} page={page} />
    </section>
  );
}
