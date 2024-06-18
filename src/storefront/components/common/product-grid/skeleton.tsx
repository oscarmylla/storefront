import { productGridClasses } from ".";
import { ProductGridItemSkeleton } from "./item/skeleton";

export function ProductGridSkeleton() {
  return (
    <ul className={productGridClasses}>
      {[...Array(8)].map((_, i) => (
        <ProductGridItemSkeleton key={i} />
      ))}
    </ul>
  );
}
