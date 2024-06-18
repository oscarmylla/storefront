import { getCategoryProducts } from "@/sanity/lib";
import { ProductGrid } from "@/storefront/components/common/product-grid";

export async function CategoryProductGrid({ id }: { id: string }) {
  const products = await getCategoryProducts({ id });

  return <ProductGrid products={products} />;
}
