import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function ProductDescription({
  vendor,
  description,
}: {
  vendor?: string;
  description?: string;
}) {
  return (
    <div className="border-t py-3 space-y-4 lg:basis-2/5">
      <h2 className="font-semibold text-xl text-[1.15rem] lg:text-[1.3rem]">
        Om varan
      </h2>
      <p>{description}</p>
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
