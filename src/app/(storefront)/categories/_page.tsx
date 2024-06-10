import { CategoriesQueryResult } from "@/sanity.types";
import { getCategories } from "@/sanity/lib";
import Link from "next/link";
import React from "react";

function CategorySection({
  categories,
}: {
  categories: CategoriesQueryResult;
}) {
  return (
    <ul className="ml-6">
      {categories.map((category) => (
        <li key={category._id}>
          <Link href={`/categories/${category.slug?.current}`}>
            {category.title}
          </Link>
          {category.category_children && (
            <CategorySection
              categories={category.category_children as CategoriesQueryResult}
              key={category._id}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <CategorySection categories={categories} />
    </div>
  );
}
