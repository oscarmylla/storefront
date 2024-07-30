import { getVendorByHandle } from "@/sanity/data/vendor";
import { VendorMain } from "@/storefront/components/vendor";
import { notFound } from "next/navigation";
import React from "react";

export default async function VendorPage({
  params,
}: {
  params: {
    handle: string;
  };
}) {
  const vendor = await getVendorByHandle({
    slug: params.handle,
  });

  if (!vendor || !vendor.blog) notFound();

  return <VendorMain vendor={vendor} />;
}
