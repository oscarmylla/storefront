import { categoryGridClasses } from ".";
import { CategoryGridItemSkeleton } from "./item/skeleton";

export function CategoryGridSkeleton() {
  return (
    <ul className={categoryGridClasses}>
      {[...Array(8)].map((_, i) => (
        <CategoryGridItemSkeleton key={i} />
      ))}
    </ul>
  );
}
