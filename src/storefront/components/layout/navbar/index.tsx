import Link from "next/link";
import { Suspense } from "react";
import logo from "@/public/images/logo.webp";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Search } from "./search";
import { Cart } from "../cart";
import OpenCart from "../cart/open-cart";
import { Navigation } from "./navigation";
import { Menu } from "./menu";
import { MenuOpen } from "./menu/client";
import { SearchButton } from "./search/button";

const { SITE_NAME } = process.env;

export default async function Navbar() {
  return (
    <nav>
      <div className="flex flex-wrap px-4 py-2.5 lg:px-6 lg:py-3 gap-x-3 gap-y-1.5 lg:gap-x-16">
        <div className="flex-1 md:hidden">
          <Suspense fallback={<MenuOpen />}>
            <Menu />
          </Suspense>
        </div>
        <Link href="/" className="w-28 sm:w-32">
          <Image
            src={logo}
            alt={SITE_NAME ?? "Logo"}
            className="w-full h-auto"
          />
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
            <Suspense fallback={<SearchButton />}>
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
      <div className="px-4 py-1.5 lg:py-0.5 lg:px-6 gap-2 flex border-y items-center justify-between">
        <Navigation />
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
