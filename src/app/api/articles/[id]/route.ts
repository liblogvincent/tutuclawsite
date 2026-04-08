import { NextRequest, NextResponse } from 'next/server';
import { getPool, initializeDatabase, rowToArticle } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// GET /api/articles/[id] — public
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await initializeDatabase();
    const pool = getPool();
    const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    // Increment view count asynchronously (fire-and-forget)
    pool.query('UPDATE articles SET views = views + 1 WHERE id = $1', [id]).catch(() => {});
    return NextResponse.json(rowToArticle(result.rows[0]));
  } catch (err) {
    console.error('[GET /api/articles/[id]]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/articles/[id] — requires JWT auth
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = verifyToken(req);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  try {
    await initializeDatabase();
    const pool = getPool();
    const body = await req.json();
    const { title, excerpt, content, coverImage, category, tags, publishedAt, author } = body;

    const result = await pool.query(
      `UPDATE articles SET
         title        = COALESCE($1, title),
         excerpt      = COALESCE($2, excerpt),
         content      = COALESCE($3, content),
         cover_image  = COALESCE($4, cover_image),
         category     = COALESCE($5, category),
         tags         = COALESCE($6, tags),
         published_at = COALESCE($7, published_at),
         author       = COALESCE($8, author),
         updated_at   = NOW()
       WHERE id = $9
       RETURNING *`,
      [title, excerpt, content, coverImage, category, tags, publishedAt, author, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(rowToArticle(result.rows[0]));
  } catch (err) {
    console.error('[PUT /api/articles/[id]]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/articles/[id] — requires JWT auth
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = verifyToken(req);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  try {
    await initializeDatabase();
    const pool = getPool();
    const result = await pool.query(
      'DELETE FROM articles WHERE id = $1 RETURNING id',
      [id]
    );
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/articles/[id]]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
