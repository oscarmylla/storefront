"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/storefront/components/ui/navigation-menu";
import { cn } from "@/storefront/lib/utils";
import { CategoriesQueryResult } from "@/sanity.types";
import Image from "next/image";
import { BadgePercent, Cherry, Clock } from "lucide-react";

const discounts = [
  {
    title: "Svinnsmarta deals",
    href: "/collections/kort-bast-fore-datum",
    description: "Varor med kortare utgångsdatum.",
    icon: Clock,
  },
  {
    title: "Veckans erbjudanden",
    href: "/collections/veckans-extrapriser",
    description: "De bästa erbjudandena just nu.",
    icon: BadgePercent,
  },
];

export function NavigationClient({
  categories,
}: {
  categories: CategoriesQueryResult;
}) {
  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Link href="/categories" legacyBehavior passHref>
              <NavigationMenuLink className="flex gap-2.5 items-center">
                <Cherry className="size-4" />
                Kategorier
              </NavigationMenuLink>
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-x-3 gap-y-1.5 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {categories.map((category) => (
                <CategoryListItem
                  key={category._id}
                  title={category.title ?? ""}
                  href={`/categories/${category.slug?.current}`}
                  image={category.thumbnails[0]}
                  product_count={category.product_count}
                >
                  {category.title}
                </CategoryListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Erbjudanden</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {discounts.map((discount) => (
                <ListItem
                  key={discount.title}
                  title={discount.title}
                  href={discount.href}
                  icon={discount.icon}
                >
                  {discount.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/recipes" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Recept
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/vendors" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Mathjältar
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const CategoryListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> &
    LinkProps & {
      title: string;
      product_count: number;
      image?: string | null;
    }
>(({ className, title, children, image, product_count, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "flex items-center gap-2.5 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          {image && (
            <Image
              src={image}
              alt={title}
              width={100}
              height={100}
              className="aspect-square w-11 rounded-md overflow-hidden"
            />
          )}
          <div>
            <span className="text-sm font-semibold">{title}</span>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product_count} varor
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
CategoryListItem.displayName = "CategoryListItem";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }
>(({ className, title, children, href, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href ?? ""}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <span className="text-sm font-medium leading-none flex gap-2 items-center">
            <Icon className="size-5 shrink-0" />
            {title}
          </span>
          <p className="text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
