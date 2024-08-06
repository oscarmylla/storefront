import React from "react";
import fs from "fs";
import { getProduct } from "@/storefront/lib/shopify";
import Link from "next/link";
import { Button } from "@/storefront/components/ui/button";
import { developerClient } from "@/sanity/lib/client";
import { z } from "zod";
import { FormSchema, SeedProductForm } from "./form";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { Product } from "@/sanity.types";

export const dynamic = "force-dynamic";

async function patchProduct(_id: string, data: z.infer<typeof FormSchema>) {
  "use server";

  const patchData = {
    ...data,
    ingredients: data.ingredients,
    labels: data.labels,
  };

  // remove values of empty strings
  for (const key in patchData) {
    // @ts-ignore
    if (patchData[key] === "") {
      // @ts-ignore
      patchData[key] = null;
    }
  }

  // remove nan values of nutritionalValue
  if (patchData.nutritionalValue) {
    for (const key in patchData.nutritionalValue) {
      if (
        // @ts-ignore
        isNaN(patchData.nutritionalValue[key]) ||
        // @ts-ignore
        patchData.nutritionalValue[key] === "" ||
        // @ts-ignore
        patchData.nutritionalValue[key] === 0
      ) {
        // @ts-ignore
        patchData.nutritionalValue[key] = null;
      }
    }
  }

  const res = await developerClient.patch(_id).set(patchData).commit();

  // revalidate the product page
  revalidateTag(`cache-product-test`);

  return res;
}

export type JSONProduct = {
  handle: string;
  country?: string;
  city?: string;
  description?: string;
  size?: string;
  packaging?: string;
  storage?: string;
  ingredients?: string[];
  labels?: string[];
  nutritionalValue: {
    calories: string;
    protein: string;
    carbohydrates: string;
    sugars: string;
    fat: string;
    saturated: string;
  };
};

const getCachedProduct = unstable_cache(
  async (index: number) =>
    developerClient.fetch(`*[_type == "product"][${index}]`),
  ["cache-product-test"],
  {
    tags: ["cache-product-test"],
  }
);

export default async function SeedProductPage({
  params,
}: {
  params: {
    index: string;
  };
}) {
  const index = parseInt(params.index);
  const product: Product = await getCachedProduct(index);

  if (!product) {
    return <div>Sanity product not found</div>;
  }

  return (
    <div className="flex items-start gap-10 container">
      <div className="flex-1">
        <h1 className="font-semibold text-2xl">
          <a href={`https://mylla.se/products/${product.store?.slug?.current}`}>
            {product?.store?.title}
          </a>
        </h1>
        <SeedProductForm
          _id={product._id}
          handleSubmit={patchProduct}
          product={product}
        />
        <Button
          asChild
          className="mt-7 fixed top-32 right-20 z-10"
          variant="secondary"
        >
          <Link href={`/seed/product/${index + 1}`}>Next</Link>
        </Button>
      </div>
      {product?.store?.descriptionHtml && (
        <div
          dangerouslySetInnerHTML={{ __html: product.store.descriptionHtml }}
          className="sticky top-32 flex-1"
        />
      )}
    </div>
  );
}
