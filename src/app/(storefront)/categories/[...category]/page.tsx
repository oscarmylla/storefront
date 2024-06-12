import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoriesByPath } from "@/sanity/lib";
import React, { Suspense } from "react";
import { CategoryBreadcrumb } from "@/storefront/components/category/breadcrumb";
import { CategoryNavigation } from "@/storefront/components/category/navigation";
import {
  CategoryProducts,
  CategoryProductsSkeleton,
} from "@/storefront/components/category/products";

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

  const rootCategory = categories[0];

  return (
    <section className="container">
      <div className="space-y-5">
        <CategoryBreadcrumb categories={categories} slugs={params.category} />
        <h1 className="text-3xl tracking-tight font-bold lg:text-4xl">
          {rootCategory.title}
        </h1>
        <CategoryNavigation categories={categories} params={params.category} />
      </div>
      <Suspense fallback={<CategoryProductsSkeleton />}>
        <CategoryProducts id={category._id} />
      </Suspense>
    </section>
  );
}
