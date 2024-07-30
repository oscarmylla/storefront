import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/storefront/components/ui/carousel";
import { ReviewItem } from "./item";

export type Review = {
  rating: number;
  content: string;
  name: string;
  city: string;
};

const reviews: Review[] = [
  {
    rating: 5,
    content:
      "Mylla har en snabb leverans, väldigt personlig och tillgänglig service och framförallt fina produkter till bra pris! Det känns bra i magen att handla från Mylla.",
    name: "Lotta K.",
    city: "Stockholm",
  },
  {
    rating: 4,
    content:
      "Väldigt fin mat av hög kvalitet till ett bra pris. Känns bra att handla lokalproducerat. Mycket nöjd. Detta var första gången jag handlade på Mylla men absolut inte sista.",
    name: "Johan S.",
    city: "Göteborg",
  },
  {
    rating: 5,
    content:
      "Det enda jag beklagar är att jag inte upptäckt Mylla tidigare! Bra mat, till bra priser, snabbt och smidigt levererat - känns bra att handla från lokala producenter!",
    name: "Anna L.",
    city: "Stockholm",
  },
  {
    rating: 5,
    content:
      "Lägre pris än i butik, smidig leverans och ett brett utbud som gör att stora delar av mina inköp kan göras med lokala råvaror som bas, hoppas fler upptäcker Mylla. Tack för er insats!",
    name: "Julia O.",
    city: "Göteborg",
  },
];

export function Reviews() {
  return (
    <div className="container my-12 md:my-16">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4 py-3">
          {reviews.map((review, index) => {
            return (
              <CarouselItem
                className="pl-4 basis-full md:basis-1/2 lg:basis-2/5"
                key={index}
              >
                <ReviewItem review={review} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-0 -translate-x-1/2" />
        <CarouselNext className="right-0 translate-x-1/2" />
      </Carousel>
    </div>
  );
}
