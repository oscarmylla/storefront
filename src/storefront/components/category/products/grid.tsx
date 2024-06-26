import { getCategoryProducts } from "@/sanity/data/category";
import { ProductGrid } from "@/storefront/components/common/product-grid";

export async function CategoryProductGrid({ id }: { id: string }) {
  const products = await getCategoryProducts({ id });

  return <ProductGrid products={products} className="py-10" />;
}
