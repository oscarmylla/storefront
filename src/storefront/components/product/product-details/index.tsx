import { Category, Product, Vendor } from "@/sanity.types";
import { ProductContents } from "./contents";
import { ProductDescription } from "./description";
import { ProductNutrition } from "./nutrition";

export function ProductDetails({
  product,
}: {
  product: Omit<Product, "vendor" | "categoryPath"> & {
    vendor: Vendor | null;
    categoryPath: Category[] | null;
  };
}) {
  const { store, description, vendor } = product;

  return (
    <div>
      <div className="lg:flex lg:gap-6 xl:gap-10 py-6">
        <ProductDescription vendor={vendor?.name} description={description} />
        <div className="lg:basis-3/5">
          <ProductContents product={product} />
          <ProductNutrition nutritionalValue={product.nutritionalValue} />
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
