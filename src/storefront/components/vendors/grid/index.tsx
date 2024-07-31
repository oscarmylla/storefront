import { getVendors } from "@/sanity/data/vendor";
import { urlForImage } from "@/sanity/utils/urlForImage";
import Image from "next/image";
import Link from "next/link";

export async function VendorsGrid() {
  const vendors = await getVendors();

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-3 container gap-x-3 md:gap-x-4 gap-y-6 md:gap-y-9">
      {vendors
        .filter((v) => v.blog)
        .map((vendor) => (
          <li key={vendor._id}>
            <Link
              href={`/vendors/${vendor.slug?.current}`}
              className="border block rounded-md overflow-hidden"
            >
              <div className="aspect-[13/9] relative">
                {vendor.thumbnail && (
                  <Image
                    className="h-auto w-full object-cover"
                    alt={vendor.thumbnail?.alt || ""}
                    src={
                      urlForImage(vendor.thumbnail)?.width(1000).url() as string
                    }
                    sizes="50vw"
                    fill
                  />
                )}
              </div>
              <div className="px-4 py-1.5 sm:py-2 border-t text-center">
                <span className="font-medium sm:text-lg">{vendor.name}</span>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
}
