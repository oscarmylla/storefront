"use client";

import {
  Pagination as PaginationComponent,
  PaginationContent,
} from "@/storefront/components/ui/pagination";
import { generatePaginationLinks } from "@/storefront/utils/generate-pagination-links";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment } from "react";

export function Pagination({
  page = 1,
  totalPages,
}: {
  page?: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <PaginationComponent>
      <PaginationContent>
        {generatePaginationLinks(page, totalPages, pathname, searchParams).map(
          (component, index) => {
            return <Fragment key={index}>{component}</Fragment>;
          }
        )}
      </PaginationContent>
    </PaginationComponent>
  );
}
