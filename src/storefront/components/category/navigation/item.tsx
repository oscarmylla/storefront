import { CategoryWithChildrenAndProductCount } from "@/sanity/types/category";
import { Button } from "../../ui/button";
import Link from "next/link";
import { Separator } from "../../ui/separator";

export function CategoryNavigationItem({
  category,
  params,
  depth,
}: {
  category: CategoryWithChildrenAndProductCount;
  params: string[];
  depth: number;
}) {
  const { category_children, title, slug, product_count } = category;
  const isCurrent = slug?.current === params[params.length - 1];
  const href = `/categories/${params.slice(0, depth).join("/")}`;
  const hasChildren = category_children.length > 0;

  return (
    <>
      <div className="flex gap-1.5 flex-wrap">
        {hasChildren && (
          <CategoryNavigationItemLink
            isCurrent={isCurrent}
            title="Alla"
            product_count={product_count}
            href={href}
          />
        )}
        {category_children.map((child) => {
          const { _id, title, slug, product_count } = child;

          const isCurrent = slug?.current === params[depth];
          const href = `/categories/${params.slice(0, depth).join("/")}/${slug?.current}`;

          return (
            <CategoryNavigationItemLink
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
