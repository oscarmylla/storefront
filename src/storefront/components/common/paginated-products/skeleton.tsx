import React from "react";
import { ProductGridSkeleton } from "../product-grid/skeleton";

export default function PaginatedProductsSkeleton({
  className,
}: {
  className?: string;
}) {
  return <ProductGridSkeleton className={className} />;
}
