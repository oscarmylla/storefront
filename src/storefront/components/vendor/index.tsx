import { Vendor } from "@/sanity.types";
import { urlForImage } from "@/sanity/utils/urlForImage";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/storefront/components/ui/carousel";
import { Instagram } from "@/storefront/svgs/instagram";
import { Facebook } from "@/storefront/svgs/facebook";

export function VendorMain({ vendor }: { vendor: Vendor }) {
  if (!vendor.blog) return null;

  const hasSocials = vendor.blog.instagram || vendor.blog.facebook;

  return (
    <div className="container mt-5 md:mt-8 mb-16 md:mb-32">
      <div className="flex justify-between items-center gap-8">
        <div>
          <span className="text-muted-foreground block">
            Möt människorna bakom
          </span>
          <h1 className="font-bold text-4xl mb-3 md:text-5xl md:mb-4">
            {vendor.name}
          </h1>
          <blockquote className="text-lg mb-5 max-w-2xl md:text-xl">
            {vendor.blog.quote}
          </blockquote>
        </div>
        {vendor.blog.logo && (
          <div className="md:max-w-40 xl:max-w-52 hidden md:block">
            <Image
              width={2000}
              height={2000}
              src={urlForImage(vendor.blog.logo)?.height(300).url() as string}
              alt={vendor.blog.logo?.alt ?? vendor.name ?? "Producent"}
              className="rounded-md w-full h-auto"
            />
          </div>
        )}
      </div>
      <div className="mb-5">
        <Carousel
          opts={{
            align: "start",
          }}
          className="relative"
        >
          <CarouselContent className="-ml-4 py-3">
            {vendor.blog.images?.map((image) => (
              <CarouselItem
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                key={image._key}
              >
                <Image
                  key={image._key}
                  width={2000}
                  height={2000}
                  src={
                    urlForImage(image)?.height(2000).width(2000).url() as string
                  }
                  alt={image.alt ?? vendor.name ?? "Producent"}
                  className="rounded-md overflow-hidden"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-1/2" />
          <CarouselNext className="right-0 translate-x-1/2" />
        </Carousel>
      </div>
      <h2 className="text-3xl font-bold md:text-4xl mb-2">
        {vendor.blog.title}
      </h2>
      <p className="text-lg max-w-4xl">{vendor.blog.content}</p>
      {hasSocials && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">Följ {vendor.name}</h2>
          <div className="flex gap-4">
            {vendor.blog.instagram && (
              <a href={vendor.blog.instagram} target="_blank" rel="noreferrer">
                <Instagram className="size-8" />
              </a>
            )}
            {vendor.blog.facebook && (
              <a href={vendor.blog.facebook} target="_blank" rel="noreferrer">
                <Facebook className="size-8" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
