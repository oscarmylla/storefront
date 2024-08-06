import { Category, Product, Vendor } from "@/sanity.types";
import { ProductActions } from "./actions";
import { ProductGallery } from "./gallery";
import {
  Product as ShopifyProduct,
  ProductVariant,
  Image,
} from "@/storefront/lib/shopify/types";

export function ProductHero({
  shopifyProduct,
  product,
  selectedVariant,
}: {
  shopifyProduct: ShopifyProduct;
  product: Omit<Product, "vendor" | "categoryPath"> & {
    vendor: Vendor | null;
    categoryPath: Category[] | null;
  };
  selectedVariant: ProductVariant;
}) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8 xl:gap-32 lg:mb-14">
      <div className="h-full w-full basis-full lg:basis-1/2 xl:basis-2/5 lg:shrink-0">
        <ProductGallery
          images={shopifyProduct.images.map((image: Image) => ({
            src: image.url,
            altText: image.altText,
          }))}
        />
      </div>

      <div className="basis-full lg:basis-1/2 xl:basis-3/5 lg:pt-20">
        <ProductActions
          shopifyProduct={shopifyProduct}
          product={product}
          selectedVariant={selectedVariant}
        />
      </div>
    </div>
  );
}
