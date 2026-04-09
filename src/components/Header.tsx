'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(7, 8, 15, 0.75)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          borderBottom: "1px solid var(--glass-border)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))",
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ color: "#fff" }}>
                <path d="M7.5 2C6.12 2 5 3.5 5 5.5S6.12 9 7.5 9 10 7.5 10 5.5 8.88 2 7.5 2zm4.5 0c-1.38 0-2.5 1.5-2.5 3.5S10.62 9 12 9s2.5-1.5 2.5-3.5S13.38 2 12 2zm4.5 0C15.12 2 14 3.5 14 5.5S15.12 9 16.5 9 19 7.5 19 5.5 17.88 2 16.5 2zM5.5 10C4.12 10 3 11.22 3 12.5 3 14.78 5 17 7 17c.73 0 1.41-.25 2-.67V20c0 1.1.9 2 2 2s2-.9 2-2v-3.67c.59.42 1.27.67 2 .67 2 0 4-2.22 4-4.5C19 11.22 17.88 10 16.5 10c-1.1 0-2.04.59-2.5 1.5-.46-.91-1.4-1.5-2.5-1.5s-2.04.59-2.5 1.5C8.54 10.59 7.6 10 5.5 10z"/>
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Tutu<span className="gradient-text">Claw</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: '/', label: 'Home' },
              { href: '/category/Industry', label: 'Industry' },
              { href: '/category/Tech', label: 'Tech' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.background = "var(--glass-bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "var(--text-muted)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 text-sm rounded-xl w-56 focus:w-72 transition-all duration-300"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-up">
            <nav className="flex flex-col gap-1">
              {[
                { href: '/', label: 'Home' },
                { href: '/category/Industry', label: 'Industry' },
                { href: '/category/Tech', label: 'Tech' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <form onSubmit={handleSearch} className="mt-3">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--text-primary)",
                }}
              />
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
