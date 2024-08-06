"use client";

import {
  Pagination as PaginationComponent,
  PaginationContent,
} from "@/storefront/components/ui/pagination";
import { generatePaginationLinks } from "@/storefront/utils/generate-pagination-links";
import { usePathname, useSearchParams } from "next/navigation";

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
        {generatePaginationLinks(page, totalPages, pathname, searchParams)}
      </PaginationContent>
    </PaginationComponent>
  );
}
