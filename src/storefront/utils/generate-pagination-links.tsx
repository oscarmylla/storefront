// this implementation can be a bit jumpy for larger tables, but should be good for most and easily adaptable if not
// this file is where your logic for how when ellipses are shown and other fiddly bits

import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/storefront/components/ui/pagination";
import { editSearchParams } from "./edit-search-params";
import { ReadonlyURLSearchParams } from "next/navigation";

function generateHref(
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  page: number
) {
  return `${pathname}?${editSearchParams(searchParams, "page", page.toString())}`;
}

export const generatePaginationLinks = (
  currentPage: number,
  totalPages: number,
  pathname: string,
  searchParams: ReadonlyURLSearchParams
) => {
  const pages: JSX.Element[] = [];
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  if (hasPrevious) {
    pages.push(
      <PaginationItem>
        <PaginationPrevious
          href={generateHref(pathname, searchParams, currentPage - 1)}
        />
      </PaginationItem>
    );
  }

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={generateHref(pathname, searchParams, i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  } else {
    for (let i = 1; i <= 2; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={generateHref(pathname, searchParams, i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    if (2 < currentPage && currentPage < totalPages - 1) {
      pages.push(<PaginationEllipsis />);
      pages.push(
        <PaginationItem key={currentPage}>
          <PaginationLink
            href={generateHref(pathname, searchParams, currentPage)}
            isActive={true}
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      );
    }
    pages.push(<PaginationEllipsis />);
    for (let i = totalPages - 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={generateHref(pathname, searchParams, i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  }

  if (hasNext) {
    pages.push(
      <PaginationItem>
        <PaginationNext
          href={generateHref(pathname, searchParams, currentPage + 1)}
        />
      </PaginationItem>
    );
  }
  return pages;
};
