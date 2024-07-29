import { getHome } from "@/sanity/data/home";
import { Carousel } from "@/storefront/components/carousel";
import { ThreeItemGrid } from "@/storefront/components/grid/three-items";
import { HomeMain } from "@/storefront/components/home";

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  const content = await getHome();
  return <HomeMain content={content} />;
}
