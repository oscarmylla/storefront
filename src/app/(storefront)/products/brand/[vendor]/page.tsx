import { VendorMain } from "@/storefront/components/products/vendor";
import React from "react";

export default function VendorPage({ params }: { params: { vendor: string } }) {
  const vendor = decodeURIComponent(params.vendor);
  return <VendorMain vendor={vendor} />;
}
