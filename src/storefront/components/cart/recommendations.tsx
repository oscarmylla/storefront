import React from "react";
import { ProductGrid } from "../common/product-grid";
import { getProducts } from "@/sanity/data/product";

export async function CartRecommendations() {
  const products = await getProducts();

  return (
    <div className="space-y-3 md:space-y-5">
      <h2 className="text-xl md:text-2xl">Glömde du något?</h2>
      <ProductGrid products={products} />
    </div>
  );
}
