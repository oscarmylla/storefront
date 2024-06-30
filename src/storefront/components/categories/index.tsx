import React, { Suspense } from "react";
import { CategoryGrid } from "./grid";
import { CategoriesBreadcrumb } from "./breadcrumb";
import { CategoryGridSkeleton } from "./grid/skeleton";

export default function CategoriesMain() {
  return (
    <section>
      <div className="space-y-7 md:space-y-9">
        <div className="space-y-3">
          <CategoriesBreadcrumb />
          <h1 className="text-3xl tracking-tight lg:text-4xl font-serif font-bold">
            Handla efter kategori
          </h1>
        </div>
        <Suspense fallback={<CategoryGridSkeleton />}>
          <CategoryGrid />
        </Suspense>
      </div>
    </section>
  );
}
