import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const auth = request.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized: Bearer token required' }, { status: 401 });
  }

  return NextResponse.json({
    status: 'ok',
    executed_at: new Date().toISOString(),
    instruments_checked: 15,
    measures_updated: 0,
  });
}
