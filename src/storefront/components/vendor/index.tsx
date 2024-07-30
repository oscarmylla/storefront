import { Vendor } from "@/sanity.types";
import { urlForImage } from "@/sanity/utils/urlForImage";
import Image from "next/image";

export function VendorMain({ vendor }: { vendor: Vendor }) {
  if (!vendor.blog) return null;

  return (
    <div>
      {vendor.name}
      {vendor.blog.title}
      {vendor.blog.content}
      {vendor.blog.quote}
      {vendor.blog.images?.map((image) => (
        <Image
          key={image._key}
          width={2000}
          height={1000}
          src={urlForImage(image)?.height(1000).width(2000).url() as string}
          alt={image.alt ?? vendor.name ?? "Producent"}
        />
      ))}
    </div>
  );
}
