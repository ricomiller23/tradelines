import { NextResponse } from 'next/server';
import { SEED_PORT_SIGNALS, SEED_DISRUPTIONS } from '@/lib/fallback-data';

export const revalidate = 120;

export async function GET() {
  return NextResponse.json({
    signals: SEED_PORT_SIGNALS,
    disruptions: SEED_DISRUPTIONS,
    asOf: new Date().toISOString(),
  });
}
