import { getPaginatedProducts } from "@/sanity/data/product";
import { ProductGrid } from "../product-grid";
import { SortOptions } from "./sort-products";
import { Pagination } from "./pagination";

const PRODUCT_LIMIT = 30;

export type PaginatedProductsParams = {
  limit: number;
  collection_id?: string[];
  category_id?: string[];
  vendor_id?: string[];
  type_id?: string[];
  id?: string[];
  order?: SortOptions;
};

export default async function PaginatedProducts({
  order,
  page,
  collectionId,
  categoryId,
  vendorId,
  typeId,
  productsIds,
  className,
}: {
  order?: SortOptions;
  page?: number;
  collectionId?: string;
  categoryId?: string;
  vendorId?: string;
  typeId?: string;
  productsIds?: string[];
  className?: string;
}) {
  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  };

  if (collectionId) {
    queryParams["collection_id"] = [collectionId];
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId];
  }

  if (vendorId) {
    queryParams["vendor_id"] = [vendorId];
  }

  if (typeId) {
    queryParams["type_id"] = [typeId];
  }

  if (productsIds) {
    queryParams["id"] = productsIds;
  }

  if (order) {
    queryParams["order"] = order;
  }

  const { products, totalPages } = await getPaginatedProducts({
    queryParams,
    page,
  });

  return (
    <>
      <ProductGrid products={products} className={className} />
      {page && totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} />
      )}
    </>
  );
}
