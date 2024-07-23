import { PaginatedProductsQueryTemplateResult, ProductByHandleQueryResult, ProductsByIdsQueryResult, ProductsByVendorQueryResult } from "@/sanity.types";
import { sanityFetch } from "../lib/fetch";
import { paginatedProductsQuery, productByHandleQuery, productsByIdsQuery, productsByVendorQuery, productsCountQuery } from "../queries/product";
import { getProductRecommendationIds } from "@/storefront/lib/shopify";
import { PaginatedProductsParams } from "@/storefront/components/common/paginated-products";

export async function getProductCount({ queryParams }: {
   queryParams: PaginatedProductsParams;
}) {
   return await sanityFetch<number>({
      query: productsCountQuery({ queryParams })
   });
}

export async function getPaginatedProducts({
   queryParams,
   page
}: {
   queryParams: PaginatedProductsParams
   page: number
}) {
   const productCount = await getProductCount({ queryParams });

   const products = await sanityFetch<PaginatedProductsQueryTemplateResult>({
      query: paginatedProductsQuery({
         queryParams,
         page
      }),
   });

   const totalPages = Math.ceil(productCount / queryParams.limit);

   return {
      products,
      count: productCount,
      totalPages
   }
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

   const sanityIds = ids.map((id) => id.split("/").pop() ?? "")

   return getPaginatedProducts({
      queryParams: {
         id: sanityIds,
         limit: 20
      },
      page: 1
   });
}
