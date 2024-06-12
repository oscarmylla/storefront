import OpengraphImage from "@/storefront/components/opengraph-image";
import { getCollection } from "@/storefront/lib/shopify";

export const runtime = "edge";

export default async function Image({
  params,
}: {
  params: { collection: string };
}) {
  const collection = await getCollection(params.collection);
  const title = collection?.seo?.title || collection?.title;

  return await OpengraphImage({ title });
}
