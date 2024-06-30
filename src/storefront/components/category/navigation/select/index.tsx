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
import { Check, ChevronDown } from "lucide-react";

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
    <Collapsible className="border rounded-md">
      <CollapsibleTrigger asChild>
        <Button
          className="w-full border-0 text-base justify-between group font-normal"
          variant="outline"
          size="lg"
        >
          {selectedChild ? selectedChild.title : "Alla"} (
          {selectedChild ? selectedChild.product_count : product_count})
          <ChevronDown className="size-5 group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t">
        <Link
          href={href}
          className={cn(
            buttonVariants({
              size: "lg",
              variant: "outline",
            }),
            "w-full justify-start gap-1.5 border-0 border-t-1 border-b last-of-type:border-b-0 rounded-none text-primary/80",
            {
              "text-primary font-semibold": isCurrent,
            }
          )}
        >
          <Check
            className={cn("size-4", {
              "opacity-0": !isCurrent,
            })}
          />
          Alla ({product_count})
        </Link>
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
                "w-full justify-start gap-1.5 border-0 border-b last-of-type:border-b-0 rounded-none text-primary/80",
                {
                  "text-primary font-semibold": isCurrent,
                }
              )}
            >
              <Check
                className={cn("size-4", {
                  "opacity-0": !isCurrent,
                })}
              />
              {title} ({product_count})
            </Link>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
