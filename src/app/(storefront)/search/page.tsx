import PaginatedProducts from "@/storefront/components/common/paginated-products";
import PaginatedProductsSkeleton from "@/storefront/components/common/paginated-products/skeleton";
import { searchProducts } from "@/storefront/lib/shopify";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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
    q: searchValue,
    after,
    before,
  } = searchParams as { [key: string]: string };
  if (!searchValue) return notFound();

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

  const productIds = shopifyProducts.map(
    (product) => product.id.split("/").pop() ?? ""
  );

  return (
    <div>
      <div className="space-y-7">
        <div className="space-y-3">
          <p>
            {totalCount === 0
              ? "Vi kunde inte hitta några resultat för"
              : `Vi hittade ${totalCount} resultat för`}
          </p>
          <h1 className="text-3xl tracking-tight lg:text-4xl font-bold">
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
        <Suspense fallback={<PaginatedProductsSkeleton />}>
          <PaginatedProducts productsIds={productIds} />
        </Suspense>
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
