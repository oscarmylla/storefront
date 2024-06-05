import OpengraphImage from "@/storefront/components/opengraph-image";

export const runtime = "edge";

export default async function Image() {
  return await OpengraphImage();
}
