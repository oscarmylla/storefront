import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function ProductDescription({ vendor }: { vendor?: string }) {
  return (
    <div className="border-t py-3 space-y-4 lg:basis-2/5">
      <h2 className="font-semibold text-xl text-[1.15rem] lg:text-[1.3rem]">
        Om varan
      </h2>
      <p>
        Med vår fina färs av svenskt nöt- och griskött får du ett mustigt och
        smakrikt resultat tack vare den djupa smaken av nöt och saftigheten från
        det lite fetare grisköttet.
      </p>
      <p>HK Scan Kött har angett ovanstående information.</p>
      {vendor && (
        <div className="flex">
          <Link
            href={`/products/brand/${encodeURIComponent(vendor)}`}
            className="flex gap-2 items-center"
          >
            Visa alla produkter from {vendor}{" "}
            <ChevronRight className="size-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
