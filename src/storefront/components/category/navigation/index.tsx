import { CategoryWithChildrenAndProductCount } from "@/sanity/types/category";
import { Button } from "@/storefront/components/ui/button";
import Link from "next/link";
import { CategoryNavigationPills } from "./pills";
import { CategoryNavigationSelect } from "./select";

export function CategoryNavigation({
  categories,
  slugs,
}: {
  categories: CategoryWithChildrenAndProductCount[];
  slugs: string[];
}) {
  return (
    <div>
      <div className="space-y-4 hidden lg:block">
        {categories.map((category, index) => (
          <CategoryNavigationPills
            key={category._id}
            category={category}
            slugs={slugs}
            depth={index + 1}
          />
        ))}
      </div>

      <div className="space-y-2 lg:hidden">
        {categories.map((category, index) => (
          <CategoryNavigationSelect
            key={category._id}
            category={category}
            slugs={slugs}
            depth={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
