import { getVendors } from "@/sanity/data/vendor";
import { urlForImage } from "@/sanity/utils/urlForImage";
import Image from "next/image";
import Link from "next/link";

export async function VendorsGrid() {
  const vendors = await getVendors();

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 container gap-3 md:gap-4">
      {vendors.map((vendor) => (
        <li key={vendor._id}>
          <Link href={`/vendors/${vendor.slug?.current}`}>
            <div className="aspect-video relative">
              {vendor.thumbnail && (
                <Image
                  className="h-auto w-full object-cover"
                  alt={vendor.thumbnail?.alt || ""}
                  src={
                    urlForImage(vendor.thumbnail)
                      ?.height(1000)
                      .width(2000)
                      .url() as string
                  }
                  sizes="100vw"
                  fill
                />
              )}
            </div>
            <span>{vendor.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
