import { getCategoryProducts } from "@/sanity/lib";
import { CategoryProductGrid } from "./grid";
import { CategoryGridItemSkeleton } from "./item";

export async function CategoryProducts({ id }: { id: string }) {
  const products = await getCategoryProducts({ id });

  return (
    <div className="grid lg:grid-cols-4 py-10 gap-4 lg:gap-6">
      <CategoryProductGrid products={products} />
    </div>
  );
}

export function CategoryProductsSkeleton() {
  return (
    <div className="grid lg:grid-cols-4 py-10 gap-4 lg:gap-6">
      {[...Array(8)].map((_, i) => (
        <CategoryGridItemSkeleton key={i} />
      ))}
    </div>
  );
}
