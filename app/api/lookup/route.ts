import { NextRequest, NextResponse } from 'next/server';
import { SEED_MEASURES } from '@/lib/fallback-data';
import { lookupAsOfRate } from '@/lib/rates';

export const revalidate = 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin') || 'CHN';
  const hs = searchParams.get('hs') || '85';
  const asOf = searchParams.get('as_of') || new Date().toISOString().substring(0, 10);

  const matched = lookupAsOfRate(SEED_MEASURES, origin, hs, asOf);

  return NextResponse.json({
    origin,
    hs_code: hs,
    as_of: asOf,
    rates: matched.map((m) => ({
      measure_id: m.id,
      title: m.title,
      rate_text: m.rate_text,
      rate_numeric: m.rate_numeric,
      instrument: m.legal_instrument,
      status: m.status,
      effective_from: m.effective_from,
      effective_to: m.effective_to,
      source_url: m.source_url,
    })),
  });
}
