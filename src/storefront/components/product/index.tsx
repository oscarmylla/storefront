import { Gallery } from "@/storefront/components/product/gallery";
import { ProductDescription } from "@/storefront/components/product/product-description";
import { Image, Product } from "@/storefront/lib/shopify/types";
import { Suspense } from "react";
import { RelatedProducts } from "./related-products";

export function ProductMain({ product }: { product: Product }) {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:gap-8 ">
        <div className="h-full w-full basis-full lg:basis-4/6">
          <Suspense
            fallback={
              <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
            }
          >
            <Gallery
              images={product.images.map((image: Image) => ({
                src: image.url,
                altText: image.altText,
              }))}
            />
          </Suspense>
        </div>

        <div className="basis-full lg:basis-2/6">
          <ProductDescription product={product} />
        </div>
      </div>
      <Suspense>
        <RelatedProducts id={product.id} />
      </Suspense>
    </>
  );
}
