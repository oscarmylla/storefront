import { VendorByHandleQueryResult, VendorsQueryResult } from "@/sanity.types";
import { sanityFetch } from "../lib/fetch";
import { vendorByHandleQuery, vendorsQuery } from "../queries/vendor";

export async function getVendorByHandle({
   slug
}: {
   slug: string;
}) {
   return await sanityFetch<VendorByHandleQueryResult>({
      query: vendorByHandleQuery,
      params: {
         slug
      }
   });
}

export async function getVendors() {
   return await sanityFetch<VendorsQueryResult>({
      query: vendorsQuery
   });
}