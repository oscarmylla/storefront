import { getCategoryProducts } from "@/sanity/data/category";
import { ProductGrid } from "@/storefront/components/common/product-grid";

export async function CategoryProductGrid({
  id,
  className,
  order,
}: {
  id: string;
  className: string;
  order?: string;
}) {
  const products = await getCategoryProducts({ id, order });

  return <ProductGrid products={products} className={className} />;
}
