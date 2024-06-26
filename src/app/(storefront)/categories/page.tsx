import { CategoriesQueryResult } from "@/sanity.types";
import { getCategories } from "@/sanity/data/category";
import { Button } from "@/storefront/components/ui/button";
import Link from "next/link";
import React from "react";

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
            <Button asChild>
              <Link href={`/categories/${category.slug?.current}`}>
                {category.title}
                {category.product_count}
              </Link>
            </Button>
          </li>
        );
      })}
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
