
import { getPickupLocations } from '@/storefront/actions/zapiet';
import { getCart } from '@/storefront/lib/shopify';
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
   try {
      const cart = await getCart();

      if (!cart) {
         return new Response("Cart not found.", {
            status: 400,
         })
      }

      const data = await getPickupLocations(cart);

      return Response.json(data)
   } catch (error) {
      return new Response("Couldn't find dates.", {
         status: 400,
      })
   }
}