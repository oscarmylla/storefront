import {
  Image,
  ProductVariant,
  Product as ShopifyProduct,
} from "@/storefront/lib/shopify/types";
import { Suspense } from "react";
import { RelatedProducts } from "./related-products";
import { Category, Product, Vendor } from "@/sanity.types";
import { ProductBreadcrumb } from "./breadcrumb";
import { ProductDetails } from "./product-details";
import { ProductHero } from "./hero";

export async function ProductMain({
  shopifyProduct,
  product,
  selectedVariant,
  modal = false,
}: {
  shopifyProduct: ShopifyProduct;
  product: Omit<Product, "vendor" | "categoryPath"> & {
    vendor: Vendor | null;
    categoryPath: Category[] | null;
  };
  selectedVariant: ProductVariant;
  modal?: boolean;
}) {
  return (
    <div className="py-6 container">
      {!modal && (
        <ProductBreadcrumb
          categories={product.categoryPath}
          productTitle={product.store?.title}
          className="mb-4"
        />
      )}
      <ProductHero
        shopifyProduct={shopifyProduct}
        product={product}
        selectedVariant={selectedVariant}
      />
      <ProductDetails product={product} />
      <Suspense>
        <RelatedProducts id={shopifyProduct.id} modal={true} />
      </Suspense>
    </div>
  );
}
