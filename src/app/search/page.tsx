'use client';

import { useState, useEffect, Suspense } from 'react';
import ArticleCard from '@/components/ArticleCard';
import { useSearchParams } from 'next/navigation';

interface Article {
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

function filterArticles(allArticles: Article[], q: string): Article[] {
  const lower = q.toLowerCase();
  return allArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(lower) ||
      article.excerpt.toLowerCase().includes(lower) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lower))
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState(query);
  const [allArticles, setAllArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data) => setAllArticles(data));
  }, []);

  useEffect(() => {
    if (query && allArticles.length > 0) {
      setResults(filterArticles(allArticles, query));
    }
  }, [query, allArticles]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && allArticles.length > 0) {
      setResults(filterArticles(allArticles, searchTerm));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
      <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
        Search Articles
      </h1>
      <div
        className="w-12 h-0.5 rounded-full mb-8"
        style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }}
      />

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-10">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: "var(--text-muted)" }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter keywords..."
              className="w-full pl-12 pr-4 py-3.5 text-base rounded-xl"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)", color: "var(--text-primary)" }}
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl font-medium text-sm transition-all duration-300"
            style={{ background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))", color: "#fff" }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Search
          </button>
        </div>
      </form>

      {query && (
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          Found <span className="font-semibold gradient-text">{results.length}</span> articles
        </p>
      )}

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((article, i) => (
            <div key={article.id} className={`animate-fade-up delay-${Math.min(i + 1, 5)}`}>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      ) : (
        query && (
          <div className="text-center py-20">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)" }}
            >
              <svg className="w-7 h-7" style={{ color: "var(--text-muted)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-base" style={{ color: "var(--text-muted)" }}>No articles found</p>
          </div>
        )
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-32 rounded" style={{ background: "var(--bg-surface)" }} />
          <div className="h-12 w-full rounded-xl" style={{ background: "var(--bg-surface)" }} />
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
