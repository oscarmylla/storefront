
import { PaginatedProductsParams } from "@/storefront/components/common/paginated-products";
import { SortOptions } from "@/storefront/components/common/paginated-products/sort-products";
import { groq } from "next-sanity";

function sortOrder(order: SortOptions | undefined) {
   switch (order) {
      case "price_asc":
         return "store.priceRange.maxVariantPrice asc";
      case "price_desc":
         return "store.priceRange.maxVariantPrice desc";
      case "title":
         return "store.title asc";
      case "created_at":
         return "createdAt desc";
      case "best_selling":
         return "defined(sales) desc, sales desc";
      default:
         return "createdAt desc";
   }
}

export const paginatedProductsQuery = ({ queryParams, page = 1 }: {
   queryParams: PaginatedProductsParams;
   page: number;
}) => {
   const { category_id, type_id, vendor_id, id, limit, order = "best_selling" } = queryParams
   const orderFilter = `order(${sortOrder(order)})`
   const categoryFilter = category_id ? `references("${category_id}")` : "true";
   const typeFilter = type_id ? `store.productType == "${decodeURIComponent(type_id[0])}"` : "true";
   const vendorFilter = vendor_id ? `vendor.name == "${decodeURIComponent(vendor_id[0])}"` : "true";
   const productIdsFilter = id ? `store.id in [${id.map(i => `${i}`).join(", ")}]` : "true";
   const pageFilter = `[${(page - 1) * limit}...${page * limit}]`

   const documentFilter = `_type == "product" && store.status == "active" && ${categoryFilter} && ${typeFilter} && ${vendorFilter} && ${productIdsFilter}`

   return `{
      "products": *[${documentFilter}] | ${orderFilter} ${pageFilter}{
         _id,
         store,
         "variant": store.variants[0]->.store,
         origin
      },
      "count": count(*[${documentFilter}])
   }`
};

export const paginatedProductsQueryTemplate = groq`{
   "products": *[_type == "product"]{
      _id,
      store,
      "variant": store.variants[0]->.store,
      origin
   },
   "count": count(*[_type == "product"])
}`

export const productByHandleQuery = groq`*[_type == "product" && store.slug.current == $handle][0]{
   ...,
   categoryPath[]->,
   vendor->
}`

export const productsByIdsQuery = groq`*[_type == "product" && _id in $ids]`

export const productsByVendorQuery = groq`*[_type == "product" && vendor.name == $vendor]`