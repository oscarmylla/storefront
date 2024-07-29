import { Collections, Link as LinkType, Product } from "@/sanity.types";
import { FeaturedCollectionCarousel } from "./carousel";
import Image from "next/image";
import { urlForImage } from "@/sanity/utils/urlForImage";
import Link from "next/link";
import { Button } from "../../ui/button";

export function FeaturedCollection({
  collection,
}: {
  collection?: {
    title?: string;
    paragraph?: string;
    products?: Product[] | null;
    picture?: Exclude<Collections["picture"], undefined> | null;
    link?: LinkType;
  } | null;
}) {
  if (!collection) return null;

  return (
    <div className="container space-y-1">
      <div className="relative py-10 lg:py-20 lg:items-center lg:text-center rounded-md overflow-hidden text-accent bg-gradient-to-t from-primary/60 to-primary/20 flex flex-col justify-center px-4 items-start">
        <Image
          src={
            urlForImage(collection.picture)
              ?.height(1000)
              .width(2000)
              .url() as string
          }
          alt={collection.picture?.alt || ""}
          fill
          className="object-cover -z-10"
        />
        <h2 className="font-bold text-5xl leading-none">{collection.title}</h2>
        {collection.paragraph && (
          <p className="text-xl mt-3 max-w-2xl">{collection.paragraph}</p>
        )}
        {collection.link && collection.link.href && (
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="rounded-full mt-5"
          >
            <Link href={collection.link.href}>{collection.link.label}</Link>
          </Button>
        )}
      </div>
      <FeaturedCollectionCarousel products={collection.products} />
    </div>
  );
}
