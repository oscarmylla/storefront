import { HomeQueryResult } from "@/sanity.types";
import { Delivery } from "./delivery";
import { FeaturedCollection } from "./featured-collection";
import { FeaturedVendors } from "./featured-vendors";
import { Hero } from "./hero";
import { Rating } from "./rating";
import { Reviews } from "./reviews";
import { ValueProps } from "./value-props";

export function HomeMain({ content }: { content: HomeQueryResult }) {
  return (
    <div>
      <Hero />
      <Rating />
      <ValueProps />
      <FeaturedCollection collection={content?.collection1} />
      <Delivery />
      <FeaturedVendors vendors={content?.vendors} />
      <FeaturedCollection collection={content?.collection2} />
      <Reviews />
    </div>
  );
}
