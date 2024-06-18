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

function CategoryNavigationItemLink({
  isCurrent,
  title,
  product_count,
  href,
}: {
  isCurrent: boolean;
  title?: string;
  product_count: number;
  href: string;
}) {
  return (
    <Button
      variant={isCurrent ? "default" : "outline"}
      asChild
      className="rounded-full text-base gap-1.5"
    >
      <Link href={href}>
        {title}
        <span className="py-0.5 px-2.5 rounded-full bg-muted text-muted-foreground text-xs">
          {product_count}
        </span>
      </Link>
    </Button>
  );
}
