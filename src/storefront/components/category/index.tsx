import React from "react";
import { CategoryBreadcrumb } from "./breadcrumb";
import { CategoryWithChildrenAndProductCount } from "@/sanity/types/category";
import { Category } from "@/sanity.types";
import { CategoryProducts } from "./products";
import CategoryControls from "./controls";
import { CategoryNavigation } from "./navigation";

export default function CategoryMain({
  params,
  categories,
  category,
}: {
  category: Category;
  params: { category: string[] };
  categories: CategoryWithChildrenAndProductCount[];
}) {
  const rootCategory = categories[0];
  return (
    <div className="container py-7">
      <div className="space-y-6">
        <div className="space-y-3">
          <CategoryBreadcrumb categories={categories} slugs={params.category} />
          <h1 className="text-3xl tracking-tight lg:text-4xl font-serif font-bold">
            {rootCategory?.title}
          </h1>
        </div>
        <CategoryNavigation categories={categories} slugs={params.category} />
        <CategoryControls />
      </div>
      <CategoryProducts id={category._id} />
    </div>
  );
}
