'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      router.push('/admin/dashboard');
    } catch {
      setError('Network error, please retry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="glass p-8 w-full max-w-sm animate-fade-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))", color: "#fff" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" style={{ color: "#fff" }}>
              <path d="M7.5 2C6.12 2 5 3.5 5 5.5S6.12 9 7.5 9 10 7.5 10 5.5 8.88 2 7.5 2zm4.5 0c-1.38 0-2.5 1.5-2.5 3.5S10.62 9 12 9s2.5-1.5 2.5-3.5S13.38 2 12 2zm4.5 0C15.12 2 14 3.5 14 5.5S15.12 9 16.5 9 19 7.5 19 5.5 17.88 2 16.5 2zM5.5 10C4.12 10 3 11.22 3 12.5 3 14.78 5 17 7 17c.73 0 1.41-.25 2-.67V20c0 1.1.9 2 2 2s2-.9 2-2v-3.67c.59.42 1.27.67 2 .67 2 0 4-2.22 4-4.5C19 11.22 17.88 10 16.5 10c-1.1 0-2.04.59-2.5 1.5-.46-.91-1.4-1.5-2.5-1.5s-2.04.59-2.5 1.5C8.54 10.59 7.6 10 5.5 10z"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            Admin Login
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-3 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 text-sm"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-center" style={{ color: "#ef4444" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))",
              color: "#fff",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
