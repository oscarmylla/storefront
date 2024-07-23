import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoriesByPath } from "@/sanity/data/category";
import React from "react";
import CategoryMain from "@/storefront/components/category";
import { SortOptions } from "@/storefront/components/common/paginated-products/sort-products";

export async function generateMetadata({
  params,
}: {
  params: { category: string[] };
}): Promise<Metadata> {
  const categories = await getCategoriesByPath({
    slugs: params.category,
  });

  if (!categories) return notFound();

  const current = categories[categories.length - 1];

  return {
    title: current.title,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string[] };
  searchParams?: {
    order?: string;
  };
}) {
  const order = searchParams?.order;

  const categories = await getCategoriesByPath({
    slugs: params.category,
  });

  if (!categories) return notFound();

  const category = categories[categories.length - 1];

  return (
    <CategoryMain
      params={params}
      category={category}
      categories={categories}
      order={order as SortOptions | undefined}
    />
  );
}
