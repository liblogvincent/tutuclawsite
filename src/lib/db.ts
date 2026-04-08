import { Pool } from 'pg';

// Singleton pool — reused across hot-reloads in development
declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

function createPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });
}

export function getPool(): Pool {
  if (!global._pgPool) {
    global._pgPool = createPool();
  }
  return global._pgPool;
}

export async function initializeDatabase(): Promise<void> {
  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS articles (
      id          SERIAL PRIMARY KEY,
      title       TEXT        NOT NULL,
      excerpt     TEXT        NOT NULL DEFAULT '',
      content     TEXT        NOT NULL DEFAULT '',
      cover_image TEXT        NOT NULL DEFAULT '',
      category    TEXT        NOT NULL DEFAULT '',
      tags        TEXT[]      NOT NULL DEFAULT '{}',
      published_at DATE       NOT NULL DEFAULT CURRENT_DATE,
      author      TEXT        NOT NULL DEFAULT '',
      views       INTEGER     NOT NULL DEFAULT 0,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id            SERIAL PRIMARY KEY,
      username      TEXT        NOT NULL UNIQUE,
      password_hash TEXT        NOT NULL,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  // Seed the default admin account if it doesn't exist yet.
  // The password 'Xiaotutu' is hashed at seed time using bcryptjs.
  const existing = await pool.query(
    'SELECT id FROM admin_users WHERE username = $1',
    ['admin']
  );
  if (existing.rowCount === 0) {
    const bcrypt = await import('bcryptjs');
    const hash = await bcrypt.hash('Xiaotutu', 12);
    await pool.query(
      'INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)',
      ['admin', hash]
    );
  }
}

// Row → Article shape used by the rest of the app
export interface ArticleRow {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  author: string;
  views: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rowToArticle(row: any): ArticleRow {
  return {
    id: String(row.id),
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image,
    category: row.category,
    tags: row.tags ?? [],
    publishedAt: row.published_at
      ? new Date(row.published_at).toISOString().split('T')[0]
      : '',
    author: row.author,
    views: row.views,
  };
}
