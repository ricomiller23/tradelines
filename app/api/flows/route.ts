import { NextResponse } from 'next/server';
import { SEED_FLOWS, SEED_MEASURES } from '@/lib/fallback-data';
import { calculateEffectiveTariffLoad } from '@/lib/load';

export const revalidate = 120;

export async function GET() {
  const loadChnUsa = calculateEffectiveTariffLoad('CHN', 'USA', '2026-09-19', SEED_FLOWS, SEED_MEASURES);
  const loadCanUsa = calculateEffectiveTariffLoad('CAN', 'USA', '2026-09-19', SEED_FLOWS, SEED_MEASURES);

  return NextResponse.json({
    flows: SEED_FLOWS,
    effectiveLoads: [loadChnUsa, loadCanUsa].filter(Boolean),
    asOf: new Date().toISOString(),
  });
}
