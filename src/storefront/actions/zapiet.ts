"use server"

import { TAGS } from "@/storefront/lib/constants";
import { Cart } from "@/storefront/lib/shopify/types";
import { ZapietDeliveryLocationsOperation, ZapietDeliveryTimesOperation, ZapietPickupDatesOperation, ZapietPickupLocationsOperation, ZapietPickupTimesOperation } from "@/storefront/types/zapiet";
import { reshapeCart, zapietFetch } from "@/storefront/utils/zapiet";

export async function getDeliveryLocations(cart: Cart, geoSearchQuery: string) {
   const shoppingCart = reshapeCart(cart);

   const res = await zapietFetch<ZapietDeliveryLocationsOperation>({
      endpoint: 'https://api-us.zapiet.com/v1.0/delivery/locations',
      body: {
         geoSearchQuery,
         shoppingCart,
      },
      tags: [TAGS.cart],
      cache: 'no-store'
   });

   return res.body;
}

export async function getDeliveryDates(cart: Cart, locationId: string) {
   const shoppingCart = reshapeCart(cart);

   const res = await zapietFetch<ZapietPickupDatesOperation>({
      endpoint: `https://api-us.zapiet.com/v1.0/delivery/locations/${locationId}/calendar`,
      body: {
         shoppingCart,
      },
      tags: [TAGS.cart],
      cache: 'no-store'
   });

   return res.body;
}

export async function getDeliveryTimes(locationId: string, date: string) {
   const res = await zapietFetch<ZapietDeliveryTimesOperation>({
      endpoint: `https://api-us.zapiet.com/v1.0/delivery/locations/${locationId}/calendar/${date}`,
      tags: [TAGS.cart],
      cache: 'no-store'
   });

   return res.body;
}

export async function getPickupLocations(cart: Cart) {
   const shoppingCart = reshapeCart(cart);

   const res = await zapietFetch<ZapietPickupLocationsOperation>({
      endpoint: 'https://api-us.zapiet.com/v1.0/pickup/locations',
      body: {
         shoppingCart,
      },
      tags: [TAGS.cart],
      cache: 'no-store'
   });

   return res.body;
}

export async function getPickupDates(cart: Cart, locationId: string) {
   const shoppingCart = reshapeCart(cart);

   const res = await zapietFetch<ZapietPickupDatesOperation>({
      endpoint: `https://api-us.zapiet.com/v1.0/pickup/locations/${locationId}/calendar`,
      body: {
         shoppingCart,
      },
      tags: [TAGS.cart],
      cache: 'no-store'
   });

   return res.body;
}

export async function getPickuptimes(locationId: string, date: string) {
   const res = await zapietFetch<ZapietPickupTimesOperation>({
      endpoint: `https://api-us.zapiet.com/v1.0/pickup/locations/${locationId}/calendar/${date}`,
      tags: [TAGS.cart],
      cache: 'no-store'
   });

   return res.body;
}