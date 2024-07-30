import { Suspense } from "react";
import { VendorsGrid } from "./grid";
import { VendorsGridSkeleton } from "./grid/skeleton";

export function VendorsMain() {
  return (
    <div className="contain">
      <Suspense fallback={<VendorsGridSkeleton />}>
        <VendorsGrid />
      </Suspense>
    </div>
  );
}
