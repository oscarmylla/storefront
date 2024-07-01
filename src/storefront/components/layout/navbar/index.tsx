import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import { SearchSkeleton } from "./_search";
import logo from "@/public/images/logo.webp";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Badge, Cherry, Tractor, Utensils } from "lucide-react";
import { Search } from "./search";
import { Cart } from "../cart";
import OpenCart from "../_cart/open-cart";

const { SITE_NAME } = process.env;

export default async function Navbar() {
  return (
    <nav>
      <div className="flex flex-wrap px-4 py-2.5 lg:px-6 lg:py-3.5 gap-x-3 gap-y-1.5 lg:gap-x-8">
        <div className="flex-1 md:hidden">
          <Suspense fallback={null}>
            <MobileMenu />
          </Suspense>
        </div>
        <Link href="/" className="w-32 sm:w-36">
          <Image
            src={logo}
            alt={SITE_NAME ?? "Logo"}
            className="w-full h-auto"
          />
          {/* <Logo /> */}
        </Link>
        <div className="flex-1 flex justify-end lg:hidden">
          <div className="hidden md:max-lg:block">
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>
        <div className="basis-full flex lg:flex-1 gap-3">
          <div className="flex items-center flex-1">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <div className="flex items-center md:max-lg:hidden">
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="px-4 py-1.5 lg:py-1 lg:px-6 bg-muted gap-2 flex border-y items-center justify-between">
        <div className="md:flex items-center hidden text-sm font-medium">
          <Button variant="link">
            <Link href="/categories" className="flex item-center gap-1.5">
              <Cherry className="size-5" />
              Kategorier
            </Link>
          </Button>
          <Button variant="link">
            <Link
              href="/collections/kort-bast-fore-datum"
              className="flex item-center gap-1.5"
            >
              <Badge className="size-5" />
              Erbjudanden
            </Link>
          </Button>
          <Button variant="link">
            <Link href="/categories" className="flex item-center gap-1.5">
              <Utensils className="size-5" />
              Recept
            </Link>
          </Button>
          <Button variant="link">
            <Link href="/categories" className="flex item-center gap-1.5">
              <Tractor className="size-5" />
              Mathjältar
            </Link>
          </Button>
        </div>
        <div className="gap-2 flex">
          <Button size="sm" className="rounded-full">
            Logga in
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full hover:bg-background/80"
          >
            Skapa konto
          </Button>
        </div>
      </div>
    </nav>
  );
}
