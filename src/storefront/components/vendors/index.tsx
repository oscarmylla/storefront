import { Suspense } from "react";
import { VendorsGrid } from "./grid";
import { VendorsGridSkeleton } from "./grid/skeleton";

export function VendorsMain() {
  return (
    <div className="pb-32">
      <div className="container mt-12 md:mt-24 mb-8 text-center space-y-1 md:space-y-2.5 md:mb-12 md:text-left">
        <h1 className="font-bold text-3xl md:text-4xl xl:text-5xl">
          Möt våra mathjältar!
        </h1>
        <p className="text-muted-foreground text-lg xl:text-xl">
          Här hittar du våra producenter som säljer sina produkter hos oss.
        </p>
      </div>
      <Suspense fallback={<VendorsGridSkeleton />}>
        <VendorsGrid />
      </Suspense>
    </div>
  );
}
