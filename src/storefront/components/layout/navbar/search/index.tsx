"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/storefront/components/ui/command";
import { searchProducts } from "@/storefront/lib/shopify";
import { PageInfo, Product } from "@/storefront/lib/shopify/types";
import { useDebounce } from "use-debounce";
import { SearchItem } from "./item";
import { SearchButton } from "./button";
import { useMediaQuery } from "@/storefront/hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/storefront/components/ui/drawer";
import Link from "next/link";
import { Button } from "@/storefront/components/ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import { Loader2, SearchIcon } from "lucide-react";

const SEARCH_RECOMMENDATIONS = [
  "Nektarin",
  "Mango",
  "Pasta",
  "Köttbullar",
  "Korv",
  "Köttfärs",
  "Kyckling",
  "Kalkon",
  "Kött",
  "Fisk",
  "Grönsaker",
  "Frukt",
  "Bär",
];

export function Search() {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  React.useEffect(() => {
    setOpen(false);
  }, [pathname, searchParams]);

  if (isDesktop) {
    return (
      <>
        <SearchButton setOpen={setOpen} />
        <CommandDialog
          open={open}
          onOpenChange={setOpen}
          shouldFilter={false}
          className="max-w-3xl border-0"
        >
          <CommandInner
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setOpen={setOpen}
          />
        </CommandDialog>
      </>
    );
  }

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <SearchButton setOpen={setOpen} />
        </DrawerTrigger>
        <DrawerContent className="h-[95%]">
          <Command className="border-t" shouldFilter={false}>
            <CommandInner
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setOpen={setOpen}
            />
          </Command>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function CommandInner({
  searchQuery,
  setSearchQuery,
  setOpen,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <CommandInput
        value={searchQuery}
        onValueChange={setSearchQuery}
        placeholder="Sök efter produkter..."
      />
      <CommandList className="max-h-none md:max-h-[500px]">
        <SearchResults
          query={searchQuery}
          setSearchQuery={setSearchQuery}
          setOpen={setOpen}
        />
      </CommandList>
    </>
  );
}

function SearchResults({
  query,
  setSearchQuery,
  setOpen,
}: {
  query: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [debouncedSearchQuery] = useDebounce(query, 500);

  const enabled = !!debouncedSearchQuery;

  const {
    data: searchResults,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery<{ products: Product[]; pageInfo: PageInfo } | undefined>({
    queryKey: ["search", debouncedSearchQuery],
    queryFn: () => searchProducts({ query: debouncedSearchQuery, first: 20 }),
    enabled,
  });

  // To get around this https://github.com/TanStack/query/issues/3584
  const isLoading = enabled && isLoadingOrig;

  const products = searchResults?.products;

  if (!enabled) {
    return (
      <CommandGroup heading="Populära sökningar">
        {SEARCH_RECOMMENDATIONS.map((query) => {
          return (
            <CommandItem key={query} value={query} asChild>
              <button
                onClick={() => setSearchQuery(query)}
                className="w-full text-left cursor-pointer flex gap-3 border-b text-muted-foreground py-3"
              >
                <SearchIcon className="size-3" />
                {query}
              </button>
            </CommandItem>
          );
        })}
      </CommandGroup>
    );
  }

  {
    /* TODO: these should have proper loading aria */
  }

  if (isLoading) {
    return (
      <div className="py-40 text-center">
        <Loader2 className="size-8 mx-auto animate-spin" />
      </div>
    );
  }

  if (!isError && !isLoading && !products?.length) {
    return <div className="p-4 text-sm">Inga resultat hittades</div>;
  }

  if (isError) {
    return <div className="p-4 text-sm">Någonting gick fel</div>;
  }

  return (
    <>
      <CommandGroup heading="Produkter" className="pb-16">
        {products?.map((product) => {
          return (
            <CommandItem
              key={product.id}
              value={product.id}
              className="border-b py-3 pr-3 md:py-2"
            >
              <SearchItem product={product} />
            </CommandItem>
          );
        })}
      </CommandGroup>
      <div className="absolute bottom-0 left-0 right-0 w-full bg-background">
        <Button
          asChild
          size="lg"
          className="w-full rounded-none"
          onClick={() => setOpen(false)}
        >
          <Link href={`/search?q=${query}`}>Visa alla resultat</Link>
        </Button>
      </div>
    </>
  );
}
