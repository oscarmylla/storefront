import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { VisualEditing, toPlainText } from "next-sanity";
import {
  Poppins as FontSans,
  Plus_Jakarta_Sans as FontSerif,
} from "next/font/google";
import { draftMode } from "next/headers";
import { Suspense } from "react";

import AlertBanner from "@/storefront/components/alert-banner";

import type { SettingsQueryResult } from "@/sanity.types";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/queries/settings";
import { resolveOpenGraphImage } from "@/sanity/utils/resolveOpenGraphImage";
import { cn } from "@/storefront/lib/utils";
import { Footer } from "@/storefront/components/layout/footer";
import { Header } from "@/storefront/components/layout/header";
import { ReactQueryProvider } from "@/storefront/providers/react-query";
import CartProvider from "@/storefront/providers/cart";
import { getCart } from "@/storefront/lib/shopify";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SettingsQueryResult>({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = await getCart();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-[#fdfdfd] text-foreground font-sans antialiased",
          fontSans.variable,
          fontSerif.variable
        )}
      >
        <ReactQueryProvider>
          <CartProvider>
            <section className="min-h-screen">
              {draftMode().isEnabled && <AlertBanner />}
              <Header />

              <main>{children}</main>
              <Suspense>
                <Footer />
              </Suspense>
            </section>
            {draftMode().isEnabled && <VisualEditing />}
            <SpeedInsights />
          </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
