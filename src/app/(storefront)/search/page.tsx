import { getProductsByIds } from "@/sanity/data/product";
import { ProductGrid } from "@/storefront/components/common/product-grid";
import { defaultSort, sorting } from "@/storefront/lib/constants";
import { searchProducts } from "@/storefront/lib/shopify";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Sök",
  description: "Sök efter produkter.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const {
    sort,
    q: searchValue,
    after,
    before,
  } = searchParams as { [key: string]: string };
  if (!searchValue) return notFound();

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const {
    products: shopifyProducts,
    pageInfo,
    totalCount,
  } = await searchProducts({
    query: searchValue,
    first: 40,
    after,
    before,
  });

  const productIds = shopifyProducts.map((product) => product.id);
  const products = await getProductsByIds(productIds);

  // Sort products based on productsid index
  const sortedProducts = products.sort((a, b) => {
    return (
      productIds.indexOf(a.store?.gid ?? "") -
      productIds.indexOf(b.store?.gid ?? "")
    );
  });

  return (
    <div>
      <div className="space-y-7">
        <div className="space-y-3">
          <p>
            {totalCount === 0
              ? "Vi kunde inte hitta några resultat för"
              : `Vi hittade ${totalCount} resultat för`}
          </p>
          <h1 className="text-3xl tracking-tight lg:text-4xl font-serif font-bold">
            {searchValue}
          </h1>
        </div>
        {pageInfo.hasPreviousPage && (
          <Link
            href={`/search?q=${searchValue}&after=${pageInfo.startCursor}`}
            className="w-full py-3 md:py-3.5 px-4 rounded-lg bg-secondary border text-secondary-foreground flex items-center gap-2 justify-center text-center font-medium"
          >
            <span className="size-8 bg-primary text-primary-foreground flex items-center justify-center rounded-full">
              <ChevronLeft className="size-5" />
            </span>
            Visa tidigare resultat
          </Link>
        )}
        <ProductGrid products={sortedProducts} />
        {pageInfo.hasNextPage && (
          <Link
            href={`/search?q=${searchValue}&after=${pageInfo.endCursor}`}
            className="w-full py-3 md:py-3.5 px-4 rounded-lg bg-secondary border text-secondary-foreground flex items-center gap-2 justify-center text-center font-medium"
          >
            Visa fler resultat
            <span className="size-8 bg-primary text-primary-foreground flex items-center justify-center rounded-full">
              <ChevronRight className="size-5" />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
