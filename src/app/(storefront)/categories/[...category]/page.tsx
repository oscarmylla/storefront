import { getCollection, getCollectionProducts } from "@/storefront/lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import Grid from "@/storefront/components/grid";
import ProductGridItems from "@/storefront/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/storefront/lib/constants";
import { getCategoryProducts, getCategoryTree } from "@/sanity/lib";
import { Category, CategoryQueryResult } from "@/sanity.types";
import Link from "next/link";
import { Button } from "@/storefront/components/ui/button";
import Image from "next/image";

type CategoryWithChildren = Category & {
  category_children?: CategoryWithChildren[];
  product_count: number;
};

function getCurrentCategory(
  categoryTree: CategoryQueryResult,
  pathSlugs: string[]
) {
  let currentCategory: CategoryWithChildren | CategoryQueryResult =
    categoryTree;

  for (let slug of pathSlugs) {
    if (!currentCategory) return null;

    let foundChild: CategoryWithChildren | undefined =
      currentCategory.category_children?.find(
        (child) => child.slug?.current === slug
      );

    if (!foundChild) {
      return null;
    }

    currentCategory = foundChild;
  }

  return currentCategory;
}

function getDescendentSlugs(category: CategoryWithChildren): string[] {
  let slugs: string[] = category.slug?.current ? [category.slug?.current] : [];

  if (category.category_children) {
    for (let child of category.category_children) {
      slugs.push(...getDescendentSlugs(child));
    }
  }

  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: { category: string[] };
}): Promise<Metadata> {
  const tree = await getCategoryTree({
    slug: params.category[0],
  });

  if (!tree) return notFound();

  const category = getCurrentCategory(tree, params.category.slice(1));

  if (!category) return notFound();

  return {
    title: category.title,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const tree = await getCategoryTree({
    slug: params.category[0],
  });

  if (!tree) return notFound();

  const category = getCurrentCategory(tree, params.category.slice(1));

  if (!category) return notFound();

  const slugs = getDescendentSlugs(category);

  return (
    <section>
      <h1 className="text-3xl">{category.title}</h1>
      <CategorySection category={tree} params={params.category} />
      <ProductGrid slugs={slugs} />
      {/* {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )} */}
    </section>
  );
}

function getBranchProductCount(category: CategoryWithChildren): number {
  let count = category.product_count;

  if (category.category_children) {
    for (let child of category.category_children) {
      count += getBranchProductCount(child);
    }
  }

  return count;
}

function CategorySection({
  category,
  params,
  depth = 0,
}: {
  category: CategoryWithChildren;
  params: string[];
  depth?: number;
}) {
  if (!category || !category.category_children) return null;

  const href = `/categories/${params.slice(0, depth + 1).join("/")}`;

  const selectedChild = category.category_children?.find(
    (child) => child.slug?.current === params[depth + 1]
  );

  return (
    <>
      <div>
        <div className="flex">
          <Button key={category._id} asChild>
            <Link href={href}>Alla {getBranchProductCount(category)}</Link>
          </Button>
          {category.category_children?.map((category) => {
            const isCurrent = category.slug?.current === params[depth + 1];
            const href = `/categories/${params.slice(0, depth + 1).join("/")}/${category.slug?.current}`;

            return (
              <Button
                key={category._id}
                variant={isCurrent ? "default" : "outline"}
                asChild
              >
                <Link href={href}>
                  {category.title} {getBranchProductCount(category)}
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
      {selectedChild && (
        <CategorySection
          category={selectedChild}
          params={params}
          depth={depth + 1}
        />
      )}
    </>
  );
}

async function ProductGrid({ slugs }: { slugs: string[] }) {
  const products = await getCategoryProducts({ slugs });
  return (
    <div className="grid lg:grid-cols-4">
      {products.map((product) => {
        const { store } = product;
        if (!store) return null;

        const { title, descriptionHtml, previewImageUrl } = store;

        return (
          <div key={product._id}>
            <div className="aspect-square relative">
              {previewImageUrl ? (
                <Image
                  src={previewImageUrl}
                  alt={title ?? "Product image"}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>
            <h2>{title}</h2>
          </div>
        );
      })}
    </div>
  );
}
