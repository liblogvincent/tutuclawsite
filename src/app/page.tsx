'use client';

import { useState, useEffect } from 'react';
import ArticleCard from '@/components/ArticleCard';

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

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-8">
          <div className="skeleton h-72 md:h-[420px]" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton h-64" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (articles.length === 0) return null;

  const featuredArticle = articles[0];
  const recentArticles = articles.slice(1, 5);
  const popularArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero / Featured */}
      <section className="mb-16 animate-fade-up">
        <div className="hero-gradient">
          <ArticleCard article={featuredArticle} featured />
        </div>
      </section>

      {/* Recent Articles */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8 animate-fade-up delay-1">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Latest Articles
            </h2>
            <div
              className="mt-2 w-12 h-0.5 rounded-full"
              style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {recentArticles.map((article, i) => (
            <div key={article.id} className={`animate-fade-up delay-${i + 2}`}>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider mb-16" />

      {/* Popular Articles */}
      <section className="mb-16">
        <div className="mb-8 animate-fade-up">
          <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Popular
          </h2>
          <div
            className="mt-2 w-12 h-0.5 rounded-full"
            style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {popularArticles.map((article, index) => (
            <div key={article.id} className={`animate-fade-up delay-${index + 1}`}>
              <a href={`/article/${article.id}`} className="group block">
                <div className="glass glass-hover p-6">
                  <div className="flex items-start gap-5">
                    <div
                      className="rank-badge flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
                      style={{
                        background: index === 0
                          ? "linear-gradient(135deg, var(--accent-start), var(--accent-end))"
                          : "var(--bg-surface)",
                        color: index === 0 ? "#fff" : "var(--text-muted)",
                        border: index === 0 ? "none" : "1px solid var(--glass-border)",
                      }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold mb-2 line-clamp-2 leading-snug" style={{ color: "var(--text-primary)" }}>
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                        <span
                          className="px-2 py-0.5 rounded-full text-[11px]"
                          style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)" }}
                        >
                          {article.category}
                        </span>
                        <span>{article.category}</span>
                        <span>{article.author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
