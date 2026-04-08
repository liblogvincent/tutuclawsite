import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getPool, initializeDatabase } from '@/lib/db';
import { signToken } from '@/lib/auth';

// POST /api/admin/login
export async function POST(req: NextRequest) {
  try {
    await initializeDatabase();
    const pool = getPool();
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'username and password are required' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      'SELECT * FROM admin_users WHERE username = $1',
      [username]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ username: user.username });
    return NextResponse.json({ token });
  } catch (err) {
    console.error('[POST /api/admin/login]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
