"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/storefront/components/ui/sheet";
import {
  Cherry,
  CookingPot,
  Menu as MenuIcon,
  Phone,
  ScrollText,
  Tractor,
} from "lucide-react";
import { Button, ButtonProps } from "@/storefront/components/ui/button";
import { CategoriesQueryResult } from "@/sanity.types";
import Image from "next/image";
import shortExpiration from "@/public/images/layout/menu/kort-bast-fore-datum.avif";
import { ScrollArea } from "@/storefront/components/ui/scroll-area";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/storefront/components/ui/carousel";

const discounts = [
  {
    title: "Svinnsmarta deals",
    href: "/collections/kort-bast-fore-datum",
    image: shortExpiration,
  },
  {
    title: "Veckans erbjudanden",
    href: "/collections/veckans-extrapriser",
    image: shortExpiration,
  },
];

const shortcuts = [
  { title: "Mathjältar", href: "/vendors", icon: Tractor },
  { title: "Recept", href: "/recepies", icon: CookingPot },
  { title: "Kategorier", href: "/categories", icon: Cherry },
  { title: "Kontakt", href: "/kontakt", icon: Phone },
  { title: "Varför Mylla?", href: "/", icon: ScrollText },
];

export function MenuClient({
  categories,
}: {
  categories: CategoriesQueryResult;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild>
        <MenuOpen />
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <ScrollArea>
          <SheetHeader className="sr-only">
            <SheetTitle>Meny</SheetTitle>
            <SheetDescription>
              Här hittar du allt från produkter till information om oss.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-7">
            <div>
              <h3 className="font-semibold mb-3 p-6 pb-0">Genvägar</h3>
              <Carousel
                opts={{
                  dragFree: true,
                  containScroll: "trimSnaps",
                }}
              >
                <CarouselContent className="-ml-2" containerClassName="px-6">
                  {shortcuts.map(({ title, href, icon: Icon }, i) => (
                    <CarouselItem key={i} className="basis-auto pl-2">
                      <Button
                        className="w-full text-left rounded-full"
                        variant="outline"
                        size="lg"
                        asChild
                      >
                        <Link href={href}>
                          <Icon className="size-5 mr-2" />
                          {title}
                        </Link>
                      </Button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            <div className="px-6">
              <h3 className="font-semibold mb-3">Erbjudanden</h3>
              <ul className="space-y-3">
                {discounts.map(({ title, image, href }, i) => (
                  <li
                    key={i}
                    className="rounded-md relative h-24 overflow-hidden"
                  >
                    <span className="leading-none flex gap-2 absolute z-10 inset-0 items-center justify-center bg-gradient-to-t from-primary/60 to-primary/20 text-accent font-semibold">
                      {title}
                    </span>
                    <Image
                      src={image!}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-6">
              <h3 className="font-semibold">Kategorier</h3>
              <ul>
                {categories.map((category) => (
                  <li key={category._id} className="border-b last:border-b-0">
                    <Link
                      href={`/categories/${category.slug?.current}`}
                      className="flex gap-5 items-center py-3"
                    >
                      <Image
                        src={category.thumbnails[0]!}
                        alt={category.title!}
                        className="w-11 rounded-md aspect-square"
                        width={80}
                        height={80}
                      />
                      <span className="font-medium">{category.title}</span>
                      <span className="rounded-full px-3.5 py-1.5 bg-muted text-xs ml-auto">
                        {category.product_count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export const MenuOpen = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <Button
        variant="outline"
        className="border-0"
        size="icon"
        ref={ref}
        {...props}
      >
        <MenuIcon className="size-7" />
      </Button>
    );
  }
);

MenuOpen.displayName = "MenuOpen";
