import { CategoriesByPathQueryResult, CategoriesQueryResult, Product } from "@/sanity.types";
import { sanityFetch } from "./fetch";
import { categoriesByPathQuery, categoriesQuery, categoryProductsQuery } from "./queries";
import { ShopifyWebhookOrder } from "@/storefront/lib/shopify/types";
import { developerClient } from "./client";
import { TAGS } from "@/storefront/lib/sanity/constants";

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
      tags: [TAGS.categories],
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

      return category.parent?._ref === categories[index + 1]?._id;
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

export async function incrementProductSales(body: ShopifyWebhookOrder | undefined) {
   if (!body) return;

   const productIncrements = new Map<string, number>()

   for (const lineItem of body.line_items) {
      const productId = lineItem.product_id.toString();

      if (!productId) continue;

      const productQuantity = lineItem.quantity;
      const currentCount = productIncrements.get(productId) || 0;

      productIncrements.set(productId, currentCount + productQuantity);
   }

   for (const [productId, increment] of productIncrements) {
      const document = await developerClient.getDocument(`shopifyProduct-${productId}`);

      if (!document) {
         console.log(`Webhook shopify/order/create: Document not found for ${productId}`)
         continue
      };

      if (document.sales) {
         await developerClient.patch(document._id).inc({ sales: increment }).commit()
         console.log(`Webhook shopify/order/create: Sales incremented by ${increment} for ${document._id}`)
      } else {
         await developerClient.patch(document._id).set({ sales: increment }).commit()
         console.log(`Webhook shopify/order/create: Sales set to ${increment} for ${document._id}`)
      }
   }
}