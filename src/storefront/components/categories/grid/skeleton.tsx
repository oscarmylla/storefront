import { categoryGridClasses } from ".";
import { CategoryGridItemSkeleton } from "./item/skeleton";

export function CategoryGridSkeleton() {
  return (
    <ul className={categoryGridClasses}>
      {[...Array(11)].map((_, i) => (
        <CategoryGridItemSkeleton key={i} />
      ))}
    </ul>
  );
}
