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

export function CategoriesBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Hem</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbPage>Alla varor</BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
