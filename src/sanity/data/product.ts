import { ProductByHandleQueryResult, ProductsByIdsQueryResult, ProductsQueryResult } from "@/sanity.types";
import { sanityFetch } from "../lib/fetch";
import { productByHandleQuery, productsByIdsQuery, productsQuery } from "../queries/product";
import { getProductRecommendationIds } from "@/storefront/lib/shopify";

export async function getProducts() {
   return sanityFetch<ProductsQueryResult>({
      query: productsQuery,
   });
}

export async function getProductByHandle({
   handle,
}: {
   handle: string;
}) {
   return sanityFetch<ProductByHandleQueryResult>({
      query: productByHandleQuery,
      params: {
         handle
      }
   });
}

export async function getProductRecommendations(id: string) {
   const ids = await getProductRecommendationIds(id);

   const sanityIds = ids.map((id) => `shopifyProduct-${id.split("/").pop()}`);
   return sanityFetch<ProductsByIdsQueryResult>({
      query: productsByIdsQuery,
      params: {
         ids: sanityIds
      }
   });
}

export async function getProductsByIds(ids: string[]) {
   const sanityIds = ids.map((id) => `shopifyProduct-${id.split("/").pop()}`);
   return sanityFetch<ProductsByIdsQueryResult>({
      query: productsByIdsQuery,
      params: {
         ids: sanityIds
      }
   });
}
