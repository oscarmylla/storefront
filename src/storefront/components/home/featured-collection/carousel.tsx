import React from "react";

import { ProductGridItem } from "../../common/product-grid/item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/storefront/components/ui/carousel";
import { Product } from "@/sanity.types";

export function FeaturedCollectionCarousel({
  products,
}: {
  products?: Product[] | null;
}) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-4 py-3">
        {products?.map((product) => {
          return (
            <CarouselItem
              className="pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              key={product._id}
            >
              <ProductGridItem product={product} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-0 -translate-x-1/2" />
      <CarouselNext className="right-0 translate-x-1/2" />
    </Carousel>
  );
}
