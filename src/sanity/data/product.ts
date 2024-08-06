import { PaginatedProductsQueryTemplateResult, ProductByHandleQueryResult, } from "@/sanity.types";
import { sanityFetch } from "../lib/fetch";
import { paginatedProductsQuery, productByHandleQuery, } from "../queries/product";
import { getProductRecommendationIds } from "@/storefront/lib/shopify";
import { PaginatedProductsParams } from "@/storefront/components/common/paginated-products";

export async function getPaginatedProducts({
   queryParams,
   page = 1
}: {
   queryParams: PaginatedProductsParams
   page?: number
}) {
   const { products, count } = await sanityFetch<PaginatedProductsQueryTemplateResult>({
      query: paginatedProductsQuery({
         queryParams,
         page
      }),
   });

   const totalPages = Math.ceil(count / queryParams.limit);

   return {
      products,
      count,
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
