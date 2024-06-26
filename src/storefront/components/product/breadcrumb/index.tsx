import { Category, Product } from "@/sanity.types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/storefront/components/ui/breadcrumb";
import { cn } from "@/storefront/lib/utils";
import React from "react";

export function ProductBreadcrumb({
  categories,
  className,
  productTitle,
}: {
  categories?: Category[] | null;
  className?: string;
  productTitle?: string;
}) {
  if (!categories) return null;
  const slugs = categories.map((category) => category.slug?.current);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem className={"max-sm:hidden"}>
          <BreadcrumbLink href="/categories">Hela sortimentet</BreadcrumbLink>
        </BreadcrumbItem>
        {categories.map((category, index) => (
          <React.Fragment key={category._id}>
            <BreadcrumbSeparator
              className={cn({
                "max-sm:hidden": index !== categories.length,
              })}
            />
            <BreadcrumbItem
              className={cn({
                "max-sm:hidden": index !== categories.length - 1,
              })}
            >
              <BreadcrumbLink
                href={`/categories/${slugs.slice(0, index + 1).join("/")}`}
              >
                {category.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
        <BreadcrumbSeparator />
        <BreadcrumbPage>{productTitle}</BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
