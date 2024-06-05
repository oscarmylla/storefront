import { Carousel } from "@/storefront/components/carousel";
import { ThreeItemGrid } from "@/storefront/components/grid/three-items";
import Footer from "@/storefront/components/layout/footer";

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
