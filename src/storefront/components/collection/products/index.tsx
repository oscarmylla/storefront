import { getCollectionProducts } from "@/storefront/lib/shopify";
import PaginatedProducts from "../../common/paginated-products";
import { Suspense } from "react";
import PaginatedProductsSkeleton from "../../common/paginated-products/skeleton";
import { SortOptions } from "../../common/paginated-products/sort-products";

export async function CollectionProducts({
  handle,
  order,
}: {
  handle: string;
  order?: SortOptions;
}) {
  const shopifyProducts = await getCollectionProducts({ collection: handle });
  const productIds = shopifyProducts.map(
    (product) => product.id.split("/").pop() ?? ""
  );

  return (
    <Suspense fallback={<PaginatedProductsSkeleton />}>
      <PaginatedProducts productsIds={productIds} page={1} order={order} />
    </Suspense>
  );
}
