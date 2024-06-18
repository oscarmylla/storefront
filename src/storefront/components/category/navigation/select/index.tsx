import { CategoryWithChildrenAndProductCount } from "@/sanity/types/category";
import React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/storefront/components/ui/collapsible";
import { Button, buttonVariants } from "@/storefront/components/ui/button";
import Link from "next/link";
import { cn } from "@/storefront/lib/utils";

export function CategoryNavigationSelect({
  category,
  slugs,
  depth,
}: {
  category: CategoryWithChildrenAndProductCount;
  slugs: string[];
  depth: number;
}) {
  const { category_children, title, slug, product_count } = category;
  const isCurrent = slug?.current === slugs[slugs.length - 1];
  const href = `/categories/${slugs.slice(0, depth).join("/")}`;
  const hasChildren = category_children.length > 0;
  const selectedChild = category_children.find(
    (child) => child.slug?.current === slugs[depth]
  );

  if (!hasChildren) return null;

  return (
    <>
      <Collapsible className="border rounded-md">
        <CollapsibleTrigger asChild>
          <Button
            className="w-full border-0 justify-start"
            variant="outline"
            size="lg"
          >
            {selectedChild ? selectedChild.title : "Alla"} ({product_count})
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="border-t">
          {category_children.map((child) => {
            const { _id, slug, title, product_count } = child;
            if (!slug?.current) return null;
            const href = `/categories/${slugs.slice(0, depth).join("/")}/${slug.current}`;
            const isCurrent = slug.current === slugs[depth];

            return (
              <Link
                key={_id}
                href={href}
                className={cn(
                  buttonVariants({
                    size: "lg",
                    variant: "outline",
                  }),
                  "w-full justify-start border-0 border-b last-of-type:border-b-0 rounded-none",
                  {
                    "text-primary font-bold": isCurrent,
                  }
                )}
              >
                {title} ({product_count})
              </Link>
            );
          })}
        </CollapsibleContent>
      </Collapsible>
      {/* <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="w-full">
            {title} ({product_count})
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="dropdown-menu-content-width-full"
          alignOffset={0}
        >
          <DropdownMenuItem asChild>
            <Link
              href={href}
              className={cn({
                "text-primary font-bold": isCurrent,
              })}
            >
              {title} ({product_count})
            </Link>
          </DropdownMenuItem>
          {category_children?.map((child) => {
            const { _id, slug, title, product_count } = child;
            if (!slug?.current) return null;
            const href = `/categories/${slugs.slice(0, depth).join("/")}/${slug.current}`;
            const isCurrent = slug.current === slugs[depth];

            return (
              <DropdownMenuItem key={_id} asChild>
                <Link
                  href={href}
                  className={cn({
                    "text-primary font-bold": isCurrent,
                  })}
                >
                  {title} ({product_count})
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu> */}
    </>
  );
}
