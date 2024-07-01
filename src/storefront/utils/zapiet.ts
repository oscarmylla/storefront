import { Cart } from "../lib/shopify/types";
import { parseGid } from "./gid";

export async function zapietFetch<T>({
   cache = 'force-cache',
   headers,
   body: _body,
   tags,
   endpoint,
}: {
   cache?: RequestCache;
   headers?: HeadersInit;
   body?: any,
   tags?: string[];
   endpoint: string;
}): Promise<{ status: number; body: T } | never> {
   const url = endpoint + "?" + new URLSearchParams({
      api_key: process.env.ZAPIET_API_KEY as string,
      shop: process.env.SHOPIFY_STORE_DOMAIN as string
   })

   try {
      const result = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            ...headers
         },
         body: JSON.stringify(_body),
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
      throw {
         error: e,
      };
   }
}

export function reshapeCart(cart: Cart) {
   return cart.lines.map((line) => {
      return {
         variant_id: parseGid(line.merchandise.id).id,
         product_id: parseGid(line.merchandise.product.id).id,
         quantity: line.quantity,
         tags: line.merchandise.product.tags,
         sku: line.merchandise.sku,
         vendors: [line.merchandise.product.vendor],
         product_types: [line.merchandise.product.productType]
      };
   });
}

export function getZapietId(params: {
   date: string,
   start_time: string,
   location_id: number,
   method: string
}) {
   var fomatted_date = '';
   if (params.date && !params.start_time) {
      var fomatted_date = params.date.replace(/\//g, "-");
      fomatted_date = fomatted_date + 'T00:00:00Z';
   } else if (params.date && params.start_time) {
      var fomatted_date = params.date.replace(/\//g, "-");
      fomatted_date = fomatted_date + 'T' + params.start_time + ':00Z';
   }
   return encodeZapietId({
      M: getMethodKey(params.method),
      L: (params.location_id) ? params.location_id : "",
      D: fomatted_date,
      P: ""
   });
}

function getMethodKey(method: string) {
   if (method == 'delivery') {
      return 'D';
   } else if (method == 'pickup') {
      return 'P';
   } else {
      return 'S';
   }
}

function encodeZapietId(params: {
   M: string,
   L: number | string,
   D: string,
   P: string
}) {
   const ret = [];
   for (let d in params) {
      if (params[d as keyof typeof params]) {
         ret.push(d + '=' + params[d as keyof typeof params]);
      }
   }
   return ret.join('&');
}