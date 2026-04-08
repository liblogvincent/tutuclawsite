import { cookies } from "next/headers";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Xiaotutu";

// Simple session token — in production you'd use JWT or signed cookies
const SESSION_TOKEN = "tutuclaw-admin-session";

export function verifyCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function createSession() {
  const { cookies: nextCookies } = await import("next/headers");
  const cookieStore = await nextCookies();
  cookieStore.set(SESSION_TOKEN, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSession() {
  const { cookies: nextCookies } = await import("next/headers");
  const cookieStore = await nextCookies();
  cookieStore.delete(SESSION_TOKEN);
}

export async function isAuthenticated(): Promise<boolean> {
  const { cookies: nextCookies } = await import("next/headers");
  const cookieStore = await nextCookies();
  const session = cookieStore.get(SESSION_TOKEN);
  return session?.value === "authenticated";
}
