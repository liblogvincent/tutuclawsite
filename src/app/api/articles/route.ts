import { NextRequest, NextResponse } from 'next/server';
import { getPool, initializeDatabase, rowToArticle } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// GET /api/articles — public, returns all articles ordered by published_at desc
export async function GET() {
  try {
    await initializeDatabase();
    const pool = getPool();
    const result = await pool.query(
      'SELECT * FROM articles ORDER BY published_at DESC, id DESC'
    );
    return NextResponse.json(result.rows.map(rowToArticle));
  } catch (err) {
    console.error('[GET /api/articles]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/articles — requires JWT auth, creates a new article
export async function POST(req: NextRequest) {
  const auth = verifyToken(req);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await initializeDatabase();
    const pool = getPool();
    const body = await req.json();
    const { title, excerpt, content, coverImage, category, tags, publishedAt, author } = body;

    if (!title) {
      return NextResponse.json({ error: 'title is required' }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO articles
         (title, excerpt, content, cover_image, category, tags, published_at, author)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        title,
        excerpt ?? '',
        content ?? '',
        coverImage ?? '',
        category ?? '',
        tags ?? [],
        publishedAt ?? new Date().toISOString().split('T')[0],
        author ?? '',
      ]
    );

    return NextResponse.json(rowToArticle(result.rows[0]), { status: 201 });
  } catch (err) {
    console.error('[POST /api/articles]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
