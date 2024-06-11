import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryProducts, getCategoriesByPath } from "@/sanity/lib";
import { CategoriesByPathQueryResult, Category } from "@/sanity.types";
import Link from "next/link";
import { Button } from "@/storefront/components/ui/button";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/storefront/components/ui/breadcrumb";
import React from "react";

type CategoryWithChildren = Category & {
  product_count: number;
  category_children?: (Category & { product_count: number })[];
};

export async function generateMetadata({
  params,
}: {
  params: { category: string[] };
}): Promise<Metadata> {
  const categories = await getCategoriesByPath({
    slugs: params.category,
  });

  if (!categories) return notFound();

  const current = categories[categories.length - 1];

  return {
    title: current.title,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const categories = await getCategoriesByPath({
    slugs: params.category,
  });

  if (!categories) return notFound();

  const category = categories[categories.length - 1];

  return (
    <section>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories">Alla kategorier</BreadcrumbLink>
          </BreadcrumbItem>
          {categories.slice(0, categories.length - 1).map((category, index) => (
            <React.Fragment key={category._id}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/categories/${params.category.slice(0, index + 1).join("/")}`}
                >
                  {category.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
          <BreadcrumbSeparator />
          <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
            {categories[categories.length - 1].title}
          </BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl">{category.title}</h1>

      <CategoryNavigationSection
        categories={categories}
        params={params.category}
      />
      <ProductGrid id={category._id} />
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

function CategoryNavigationSection({
  categories,
  params,
}: {
  categories: CategoriesByPathQueryResult;
  params: string[];
}) {
  return (
    <div>
      {categories.map((category, index) => (
        <CategoryNavigationItem
          key={category._id}
          category={category}
          params={params}
          depth={index + 1}
        />
      ))}
    </div>
  );
}

function CategoryNavigationItem({
  category,
  params,
  depth,
}: {
  category: CategoryWithChildren;
  params: string[];
  depth: number;
}) {
  return (
    <div>
      {category.category_children?.map((child) => {
        const isCurrent = child.slug?.current === params[depth];
        const href = `/categories/${params.slice(0, depth).join("/")}/${child.slug?.current}`;

        return (
          <Button
            key={child._id}
            variant={isCurrent ? "default" : "outline"}
            asChild
          >
            <Link href={href}>
              {child.title} {child.product_count}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}

async function ProductGrid({ id }: { id: string }) {
  const products = await getCategoryProducts({ id });

  return (
    <div className="grid lg:grid-cols-4">
      {products.map((product) => {
        const { store } = product;
        if (!store) return null;

        const { title, descriptionHtml, previewImageUrl, slug } = store;

        if (!slug?.current) return null;

        return (
          <div key={product._id}>
            <Link href={`/products/${slug?.current}`}>
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
            </Link>
          </div>
        );
      })}
    </div>
  );
}
