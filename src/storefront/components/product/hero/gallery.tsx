import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/storefront/components/ui/carousel";
import Image from "next/image";

export function ProductGallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  return (
    <Carousel
      className="w-full"
      opts={{
        containScroll: "keepSnaps",
        skipSnaps: true,
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent containerClassName="rounded-md">
        {images.map((image, index) => (
          <CarouselItem key={index} className="basis-full">
            <div className="aspect-square relative">
              <Image
                src={image.src}
                alt={image.altText}
                width={1000}
                height={1000}
                className="w-full rounded-md object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 z-10 sm:translate-x-4" />
      <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 z-10 sm:-translate-x-4" />
    </Carousel>
  );
}
