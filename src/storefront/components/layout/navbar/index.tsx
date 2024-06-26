import Cart from "@/storefront/components/cart";
import OpenCart from "@/storefront/components/cart/open-cart";
import LogoSquare from "@/storefront/components/logo-square";
import { getMenu } from "@/storefront/lib/shopify";
import { Menu } from "@/storefront/lib/shopify/types";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";
import logo from "@/public/images/logo.webp";
import Image from "next/image";
const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");

  return (
    <nav className="relative flex items-center justify-between px-4 py-2 lg:px-6 lg:py-2.5">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <Image
              src={logo}
              alt={SITE_NAME ?? "Logo"}
              className="w-32 sm:w-36  h-auto"
            />
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-1/3">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
