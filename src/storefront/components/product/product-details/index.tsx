import { Category, Product } from "@/sanity.types";
import { ProductContents } from "./contents";
import { ProductDescription } from "./description";
import { ProductNutrition } from "./nutrition";

export function ProductDetails({
  product,
}: {
  product: Omit<Product, "categoryPath"> & { categoryPath: Category[] | null };
}) {
  const { store } = product;

  return (
    <div>
      <div className="lg:flex lg:gap-6 xl:gap-10 py-6">
        <ProductDescription vendor={store?.vendor} />
        <div className="lg:basis-3/5">
          <ProductContents />
          <ProductNutrition />
        </div>
      </div>

      {/* {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight"
          html={product.descriptionHtml}
        />
      ) : null} */}
    </div>
  );
}
