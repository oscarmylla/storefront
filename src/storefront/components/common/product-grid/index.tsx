import { Product } from "@/sanity.types";
import { Suspense } from "react";
import { ProductGridItem } from "./item";
import { ProductGridItemSkeleton } from "./item/skeleton";

export const productGridClasses =
  "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-10 gap-4 lg:gap-6";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0)
    return (
      <div className="col-span-4 text-center py-20">
        <p>Inga produkter hittades.</p>
      </div>
    );

  return (
    <ul className={productGridClasses}>
      {products.map((product) => (
        <Suspense key={product._id} fallback={<ProductGridItemSkeleton />}>
          <ProductGridItem product={product} />
        </Suspense>
      ))}
    </ul>
  );
}
