import { HomeQueryResult } from "@/sanity.types";
import { sanityFetch } from "../lib/fetch";
import { homeQuery } from "../queries/home";

export async function getHome() {
   return await sanityFetch<HomeQueryResult>({
      query: homeQuery
   });
}
