import React from "react";
import { CategoryBreadcrumb } from "./breadcrumbs";
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
    <div className="container">
      <div className="space-y-5">
        <CategoryBreadcrumb categories={categories} slugs={params.category} />
        <h1 className="text-3xl tracking-tight font-bold lg:text-4xl">
          {rootCategory?.title}
        </h1>
        <CategoryNavigation categories={categories} slugs={params.category} />
        <CategoryControls />
      </div>
      <CategoryProducts id={category._id} />
    </div>
  );
}
