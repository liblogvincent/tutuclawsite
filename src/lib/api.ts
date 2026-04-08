import { Article } from '@/data/articles';

const BASE_URL =
  typeof window !== 'undefined'
    ? ''
    : process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`API ${path} failed (${res.status}): ${text}`);
  }
  return res.json() as Promise<T>;
}

// ── Public article helpers ────────────────────────────────────────────────────

export async function fetchArticles(): Promise<Article[]> {
  return apiFetch<Article[]>('/api/articles');
}

export async function fetchArticle(id: string): Promise<Article | null> {
  try {
    return await apiFetch<Article>(`/api/articles/${id}`);
  } catch {
    return null;
  }
}

// ── Admin helpers (require JWT token) ────────────────────────────────────────

export async function adminLogin(
  username: string,
  password: string
): Promise<{ token: string }> {
  return apiFetch<{ token: string }>('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export async function adminVerify(
  token: string
): Promise<{ valid: boolean; username?: string }> {
  return apiFetch<{ valid: boolean; username?: string }>('/api/admin/verify', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function adminCreateArticle(
  token: string,
  data: Omit<Article, 'id' | 'views'>
): Promise<Article> {
  return apiFetch<Article>('/api/articles', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function adminUpdateArticle(
  token: string,
  id: string,
  data: Partial<Omit<Article, 'id'>>
): Promise<Article> {
  return apiFetch<Article>(`/api/articles/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function adminDeleteArticle(
  token: string,
  id: string
): Promise<void> {
  await apiFetch<void>(`/api/articles/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}
