import React from "react";
import { ProductGrid } from "../common/product-grid";
import { getPaginatedProducts } from "@/sanity/data/product";

export async function CartRecommendations() {
  const { products } = await getPaginatedProducts({
    queryParams: {
      limit: 20,
    },
    page: 1,
  });

  return (
    <div className="space-y-3 md:space-y-5">
      <h2 className="text-xl md:text-2xl">Glömde du något?</h2>
      <ProductGrid products={products} />
    </div>
  );
}
