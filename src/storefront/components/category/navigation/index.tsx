import { CategoriesByPathQueryResult } from "@/sanity.types";
import { CategoryNavigationItem } from "./item";

export function CategoryNavigation({
  categories,
  params,
}: {
  categories: CategoriesByPathQueryResult;
  params: string[];
}) {
  return (
    <div className="space-y-4">
      {categories.map((category, index) => (
        <CategoryNavigationItem
          key={category._id}
          category={category}
          params={params}
          depth={index + 1}
        />
      ))}
    </div>
  );
}
