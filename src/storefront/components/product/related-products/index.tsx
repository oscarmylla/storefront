import { getProductRecommendations } from "@/sanity/data/product";
import { ProductGrid } from "../../common/product-grid";

export async function RelatedProducts({ id }: { id: string }) {
  const { products } = await getProductRecommendations(id);

  if (!products.length) return null;

  return (
    <div className="py-8 lg:py-12 lg:space-y-6">
      <h2 className="mb-4 text-xl text-[1.15rem] lg:text-[1.4rem] font-semibold">
        Mer lokal mat i säsong
      </h2>
      <ProductGrid products={products} />
    </div>
  );
}
