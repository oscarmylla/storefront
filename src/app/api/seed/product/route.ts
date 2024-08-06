
import { developerClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { NextRequest } from "next/server";
import fs from "fs";
import { nanoid } from "nanoid";
import { ChatOpenAI } from "@langchain/openai";

import { z } from "zod";
import { getProducts } from "@/storefront/lib/shopify";
import { Connection, PageInfo, ShopifyProduct } from "@/storefront/lib/shopify/types";
import productFragment from "@/storefront/lib/shopify/fragments/product";
import { isShopifyError } from "@/storefront/lib/type-guards";

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;


const adminEndpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-04/graphql.json`
const adminToken = process.env.SHOPIFY_AMIN_ACCESS_TOKEN!

async function shopifyFetch<T>({
   cache = 'force-cache',
   headers,
   query,
   tags,
   variables
}: {
   cache?: RequestCache;
   headers?: HeadersInit;
   query: string;
   tags?: string[];
   variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
   try {
      const result = await fetch(adminEndpoint, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            "X-Shopify-Access-Token": adminToken,
            ...headers
         },
         body: JSON.stringify({
            ...(query && { query }),
            ...(variables && { variables })
         }),
         cache,
         ...(tags && { next: { tags } })
      });

      const body = await result.json();

      if (body.errors) {
         throw body.errors[0];
      }

      return {
         status: result.status,
         body
      };
   } catch (e) {
      if (isShopifyError(e)) {
         throw {
            cause: e.cause?.toString() || 'unknown',
            status: e.status || 500,
            message: e.message,
            query
         };
      }

      throw {
         error: e,
         query
      };
   }
}

const getProductsQuery = /* GraphQL */ `
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String, $first: Int = 100, $after: String) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: $first, after: $after) {
      edges {
        node {
         id
         handle
         title
         description
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

type ShopifyProductsOperation = {
   data: {
      products: Connection<{ id: string, handle: string, description: string }> & {
         pageInfo: PageInfo
      };
   };
   variables: {
      after?: string;
      first: number;
   };
};

const details = z.object({
   tradeName: z.string().optional().describe("Handelsnamn"),
   description: z.string().optional().describe("Beskrivning av produkten"),
   origin: z.object({
      country: z.string().optional().describe("Landet där produkten produceras"),
      city: z.string().optional().describe("Staden där produkten produceras"),
   }).describe("Ursprung"),
   size: z.string().optional().describe("Storlek på produkten"),
   packaging: z.string().optional().describe("Förpackning av produkten"),
   storage: z.string().optional().describe("Förvaring av produkten"),
   usage: z.string().optional().describe("Användning av produkten"),
   ingredients: z.string().optional().describe("Ingredienser i produkten"),
   labels: z.string().optional().describe("Märkningar på produkten"),
   nutritionalValue: z.object({
      calories: z.number().optional().describe("Kalorier per 100g"),
      protein: z.number().optional().describe("Protein per 100g"),
      carbohydrates: z.number().optional().describe("Kolhydrater per 100g"),
      sugars: z.number().optional().describe("Sockar per 100g"),
      fat: z.number().optional().describe("Fett per 100g"),
      saturated: z.number().optional().describe("Mättat fett per 100g"),
      salt: z.number().optional().describe("Salt per 100g"),
      other: z.string().optional().describe("Övriga näringsvärden")
   }).optional().describe("Näringsvärde per 100g"),
   other: z.string().optional().describe("Övrig information")
});

export async function POST(request: NextRequest) {

   await structureProduct({
      index: 0,
      after: "eyJsYXN0X2lkIjo4NjI5MjQzOTY5ODY3LCJsYXN0X3ZhbHVlIjoiODYyOTI0Mzk2OTg2NyJ9"
   })

   // const sanityVendors: Vendor[] = await developerClient.fetch(groq`*[_type == "vendor"]`)

   // for (const sanityVendor of sanityVendors) {
   //    if (sanityVendor.slug?.current) continue;
   //    if (!sanityVendor.name) continue;
   //    // await developerClient
   //    //    .patch(sanityVendor._id)
   //    //    .set({
   //    //       slug: {
   //    //          _type: 'slug',
   //    //          current: string_to_slug(sanityVendor.name)
   //    //       }
   //    //    })
   //    //    .commit()
   // }

   return Response.json({})
}



async function structureProduct({ after, index }: { after?: string, index: number }) {
   const { body } = await shopifyFetch<ShopifyProductsOperation>({
      query: getProductsQuery,
      variables: {
         after,
         first: 10
      }
   });

   const { products } = body.data

   const model = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0
   });

   const structuredLlm = model.withStructuredOutput(details);

   for (const product of products.edges) {
      const { node } = product;
      const { description, handle } = node;

      console.log('Processing: ' + handle)

      if (!description) continue;
      if (description.length < 20) continue;

      try {
         const [result, sanityProduct] = await Promise.all([
            structuredLlm.invoke(description),
            developerClient.fetch(groq`*[_type == "product" && store.slug.current == $handle][0]`, { handle: node.handle })
         ])

         if (!sanityProduct) {
            fs.appendFileSync("products.json", JSON.stringify({
               handle: node.handle,
            }), "utf8");
         }

         developerClient.patch(sanityProduct._id).set(result).commit();

      } catch (error) {
         console.error("Error: " + node.handle)
         console.log(error)
         fs.appendFileSync("products.json", JSON.stringify({
            handle: node.handle
         }), "utf8");
      }
   }

   if (products.pageInfo.hasNextPage) {
      console.log("Index: " + index + " : " + products.pageInfo.endCursor)

      await structureProduct({
         after: products.pageInfo.endCursor,
         index: index + products.edges.length
      });
   }
}