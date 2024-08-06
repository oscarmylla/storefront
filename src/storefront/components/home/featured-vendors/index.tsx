import { HeroQueryResult, Slug, VendorBlog } from "@/sanity.types";
import { urlForImage } from "@/sanity/utils/urlForImage";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";

type Vendors = Array<{
  _id: string;
  _type: "vendor";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  summary?: string;
  thumbnail?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
    };
    alt?: string;
    _type: "image";
  };
  slug?: Slug;
  blog?: VendorBlog;
}> | null;

export function FeaturedVendors({ vendors }: { vendors?: Vendors }) {
  return (
    <div className="grid md:grid-cols-2 gap-3 container mb-8 md:mb-16 md:gap-4">
      {vendors?.map((vendor) => (
        <Link
          href={`/vendors/${vendor.slug?.current}`}
          key={vendor._id}
          className="flex flex-col justify-center items-start relative rounded-md overflow-hidden bg-gradient-to-t from-primary/60 to-primary/20 text-accent px-5 py-7 min-h-72 md:min-h-96 md:px-12"
        >
          <Image
            src={
              urlForImage(vendor.thumbnail)
                ?.height(1000)
                .width(2000)
                .url() as string
            }
            alt={vendor.thumbnail?.alt || ""}
            fill
            className="object-cover -z-10"
          />
          <h2 className="text-3xl font-bold mb-1">{vendor.name}</h2>
          <p className="mb-5 text-lg font-medium leading-tight max-w-72 md:max-w-md">
            {vendor.summary}
          </p>
          <Button className="rounded-full" variant="secondary">
            Läs mer
          </Button>
        </Link>
      ))}
    </div>
  );
}
