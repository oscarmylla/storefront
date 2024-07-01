import { getPickuptimes } from '@/storefront/actions/zapiet'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
   const searchParams = request.nextUrl.searchParams
   const locationId = searchParams.get('locationId')
   const date = searchParams.get('date')

   if (!locationId || !date) {
      return new Response("Missing required parameters.", {
         status: 400,
      })
   }

   try {
      const data = await getPickuptimes(locationId, date);

      return Response.json(data)
   } catch (error) {
      return new Response("Couldn't find times.", {
         status: 400,
      })
   }
}