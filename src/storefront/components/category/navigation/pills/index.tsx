import { CategoryWithChildrenAndProductCount } from "@/sanity/types/category";
import { Separator } from "@/storefront/components/ui/separator";
import { CategoryNavigationPill } from "./item";

export function CategoryNavigationPills({
  category,
  slugs,
  depth,
}: {
  category: CategoryWithChildrenAndProductCount;
  slugs: string[];
  depth: number;
}) {
  const { category_children, title, slug, product_count } = category;
  const isCurrent = slug?.current
    ? slug.current === slugs[slugs.length - 1]
    : false;
  const href = `/categories/${slugs.slice(0, depth).join("/")}`;
  const hasChildren = category_children.length > 0;

  if (!hasChildren) return null;

  return (
    <>
      <div className="flex gap-1.5 flex-wrap">
        {hasChildren && (
          <CategoryNavigationPill
            isCurrent={isCurrent}
            title="Alla"
            product_count={product_count}
            href={href}
          />
        )}
        {category_children.map((child) => {
          const { _id, title, slug, product_count } = child;

          const isCurrent = slug?.current
            ? slug.current === slugs[depth]
            : false;
          const href = `/categories/${slugs.slice(0, depth).join("/")}/${slug?.current}`;

          return (
            <CategoryNavigationPill
              key={_id}
              isCurrent={isCurrent}
              title={title}
              product_count={product_count}
              href={href}
            />
          );
        })}
      </div>
      {hasChildren && <Separator />}
    </>
  );
}
