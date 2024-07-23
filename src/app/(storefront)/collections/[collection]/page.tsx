import { getCollection, getCollectionProducts } from "@/storefront/lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionMain from "@/storefront/components/collection";
import { SortOptions } from "@/storefront/components/common/paginated-products/sort-products";

export async function generateMetadata({
  params,
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} products`,
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: { collection: string };
  searchParams?: {
    order?: string;
  };
}) {
  const order = searchParams?.order;

  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return (
    <CollectionMain
      collection={collection}
      order={order as SortOptions | undefined}
    />
  );
}
