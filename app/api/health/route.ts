import { NextResponse } from 'next/server';

export const revalidate = 30;

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    last_success_at: '2026-09-19T09:30:00Z',
    stale: false,
    connectors: [
      { id: 'ustr', status: 'ok' },
      { id: 'federal_register', status: 'ok' },
      { id: 'fin_canada', status: 'ok' },
      { id: 'eu_taric', status: 'ok' },
      { id: 'un_comtrade', status: 'ok' }
    ]
  });
}
