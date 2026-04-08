import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

// GET /api/admin/verify — validates the JWT and returns user info
export async function GET(req: NextRequest) {
  const payload = verifyToken(req);
  if (!payload) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
  return NextResponse.json({ valid: true, username: payload.username });
}
