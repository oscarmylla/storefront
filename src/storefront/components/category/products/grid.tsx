import { Product } from "@/sanity.types";
import { CategoryGridItem, CategoryGridItemSkeleton } from "./item";
import { Suspense } from "react";

export function CategoryProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0)
    return (
      <div className="col-span-4 text-center py-20">
        <p>Inga produkter hittades.</p>
      </div>
    );

  return (
    <>
      {products.map((product) => (
        <Suspense key={product._id} fallback={<CategoryGridItemSkeleton />}>
          <CategoryGridItem product={product} />
        </Suspense>
      ))}
    </>
  );
}
