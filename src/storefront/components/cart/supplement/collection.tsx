import { getProducts } from "@/sanity/data/product";
import React from "react";
import { ProductGrid } from "../../common/product-grid";

export async function CartSupplementsCollection() {
  let products = await getProducts();

  return (
    <div className="space-y-3 md:space-y-5">
      <h2 className="text-xl md:text-2xl">Andra producenter hos Mylla</h2>
      <ProductGrid products={products} />
    </div>
  );
}
