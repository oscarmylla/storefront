import { CategoriesQueryResult, Category } from "@/sanity.types";
import { getCategories } from "@/sanity/lib";
import Link from "next/link";
import React from "react";

type CategoryWithChildren = {
  category_children?: CategoryWithChildren[];
  product_count: number;
};

function getBranchProductCount(category: CategoryWithChildren): number {
  let count = category.product_count;

  if (category.category_children) {
    for (let child of category.category_children) {
      count += getBranchProductCount(child);
    }
  }

  return count;
}

function CategorySection({
  categories,
}: {
  categories: CategoriesQueryResult;
}) {
  return (
    <ul className="grid lg:grid-cols-2 container">
      {categories.map((category) => {
        return (
          <li key={category._id}>
            <Link href={`/categories/${category.slug?.current}`}>
              {category.title}
              {category.product_count}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  console.log({ categories });

  return (
    <div>
      <CategorySection categories={categories} />
    </div>
  );
}
