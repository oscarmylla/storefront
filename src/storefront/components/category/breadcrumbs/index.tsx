import { Category } from "@/sanity.types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/storefront/components/ui/breadcrumb";
import React from "react";

export function CategoryBreadcrumb({
  categories,
  slugs,
}: {
  categories: Category[];
  slugs: string[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/categories">Alla kategorier</BreadcrumbLink>
        </BreadcrumbItem>
        {categories.slice(0, categories.length - 1).map((category, index) => (
          <React.Fragment key={category._id}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/categories/${slugs.slice(0, index + 1).join("/")}`}
              >
                {category.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
        <BreadcrumbSeparator />
        <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
          {categories[categories.length - 1].title}
        </BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
