import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoriesByPath } from "@/sanity/data/category";
import React from "react";
import CategoryMain from "@/storefront/components/category";

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
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const categories = await getCategoriesByPath({
    slugs: params.category,
  });

  if (!categories) return notFound();

  const category = categories[categories.length - 1];

  return (
    <CategoryMain params={params} category={category} categories={categories} />
  );
}
