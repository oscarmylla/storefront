
import { getPickupDates } from '@/storefront/actions/zapiet';
import { getCart } from '@/storefront/lib/shopify';
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
   const searchParams = request.nextUrl.searchParams
   const locationId = searchParams.get('locationId')

   if (!locationId) {
      return new Response("Missing required parameters.", {
         status: 400,
      })
   }

   try {
      const cart = await getCart();

      if (!cart) {
         return new Response("Cart not found.", {
            status: 400,
         })
      }

      const data = await getPickupDates(cart, locationId);

      return Response.json(data)
   } catch (error) {
      return new Response("Couldn't find dates.", {
         status: 400,
      })
   }
}