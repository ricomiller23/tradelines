import { NextRequest, NextResponse } from 'next/server';
import { SEED_MEASURES } from '@/lib/fallback-data';

export const revalidate = 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const country = searchParams.get('country');

  let items = [...SEED_MEASURES];

  if (status) {
    items = items.filter((m) => m.status === status);
  }
  if (country) {
    items = items.filter((m) => m.imposing_country.toUpperCase() === country.toUpperCase());
  }

  return NextResponse.json({
    items,
    total: items.length,
    asOf: new Date().toISOString(),
  }, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
  });
}
