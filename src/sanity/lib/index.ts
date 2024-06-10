import { CategoriesQueryResult, CategoryProductsQueryResult, CategoryQueryResult, Product } from "@/sanity.types";
import { sanityFetch } from "./fetch";
import { categoriesQuery, categoryProductsQuery, categoryQuery } from "./queries";

export async function getCategories() {
   return await sanityFetch<CategoriesQueryResult>({
      query: categoriesQuery,
   });
}

export async function getCategoryTree({
   slug,
}: {
   slug: string;
}) {
   return await sanityFetch<CategoryQueryResult>({
      query: categoryQuery,
      params: { slug },
   });
}

export async function getCategoryProducts({
   slugs,
}: {
   slugs: string[];
}) {
   return await sanityFetch<Product[]>({
      query: categoryProductsQuery,
      params: { slugs },
   });
}