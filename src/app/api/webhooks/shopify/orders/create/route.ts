

import { incrementSales } from '@/storefront/lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
   return incrementSales(req);
}