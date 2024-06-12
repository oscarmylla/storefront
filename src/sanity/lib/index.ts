import { CategoriesByPathQueryResult, CategoriesQueryResult, Product } from "@/sanity.types";
import { sanityFetch } from "./fetch";
import { categoriesByPathQuery, categoriesQuery, categoryProductsQuery } from "./queries";

export async function getCategories() {
   return await sanityFetch<CategoriesQueryResult>({
      query: categoriesQuery,
   });
}

export async function getCategoriesByPath({
   slugs,
}: {
   slugs: string[];
}) {
   const categories = await sanityFetch<CategoriesByPathQueryResult>({
      query: categoriesByPathQuery,
      params: { slugs },
   });

   if (!categories) return null;

   categories.sort((a, b) => {
      const aIndex = slugs.indexOf(a.slug?.current ?? '');
      const bIndex = slugs.indexOf(b.slug?.current ?? '');

      return bIndex - aIndex;
   });

   const isCorrectLength = categories.filter(category => Object.keys(category).length > 0).length === slugs.length;

   if (!isCorrectLength) return null;

   const isValidPath = categories.every((category, index) => {
      if (!category.parent && index === categories.length - 1) return true;

      return category.parent?._ref === categories[index + 1]._id;
   });

   if (!isValidPath) return null;

   return categories.reverse();
}

export async function getCategoryProducts({
   id,
}: {
   id: string;
}) {
   return await sanityFetch<Product[]>({
      query: categoryProductsQuery,
      params: { id },
   });
}