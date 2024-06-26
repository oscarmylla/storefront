import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HIDDEN_PRODUCT_TAG } from "@/storefront/lib/constants";
import { getProduct } from "@/storefront/lib/shopify";
import { ProductMain } from "@/storefront/components/product";
import { ProductModal } from "@/storefront/components/product/modal";
import { getProductByHandle } from "@/sanity/data/product";

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const [shopifyProduct, product] = await Promise.all([
    getProduct(params.handle),
    getProductByHandle({ handle: params.handle }),
  ]);

  if (!product?.store || !shopifyProduct) return notFound();

  const selectedVariant = shopifyProduct?.variants[0];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: shopifyProduct.title,
    description: shopifyProduct.description,
    image: shopifyProduct.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: shopifyProduct.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: shopifyProduct.priceRange.minVariantPrice.currencyCode,
      highPrice: shopifyProduct.priceRange.maxVariantPrice.amount,
      lowPrice: shopifyProduct.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <ProductModal>
        <ProductMain
          shopifyProduct={shopifyProduct}
          product={product}
          selectedVariant={selectedVariant}
          modal={true}
        />
      </ProductModal>
    </>
  );
}
