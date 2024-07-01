import { getProducts } from "@/sanity/data/product";
import React from "react";
import { ProductGrid } from "../../common/product-grid";

export async function CartSupplementsVendor() {
  const products = await getProducts();

  return (
    <div className="space-y-3 md:space-y-5">
      <h2 className="text-xl md:text-2xl">Vendor supplements</h2>
      <ProductGrid products={products} />
    </div>
  );
}
