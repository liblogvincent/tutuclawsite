'use client';

import { useState, useEffect } from 'react';
import { Article } from '@/data/articles';
import { fetchArticles } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then(setArticles)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-72 md:h-[420px] rounded-2xl" style={{ background: 'var(--bg-surface)' }} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl" style={{ background: 'var(--bg-surface)' }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-lg" style={{ color: 'var(--text-muted)' }}>暂无文章</p>
      </div>
    );
  }

  const featuredArticle = articles[0];
  const recentArticles = articles.slice(1, 5);
  const popularArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero / Featured */}
      <section className="mb-16 animate-fade-up">
        <ArticleCard article={featuredArticle} featured />
      </section>

      {/* Recent Articles */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8 animate-fade-up delay-1">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              最新文章
            </h2>
            <div
              className="mt-2 w-12 h-0.5 rounded-full"
              style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }}
            />
          </div>
          <a
            href="#"
            className="text-sm font-medium transition-colors duration-300"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "var(--accent-start)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "var(--text-muted)";
            }}
          >
            查看全部 →
          </a>
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
            热门文章
          </h2>
          <div
            className="mt-2 w-12 h-0.5 rounded-full"
            style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {popularArticles.map((article, index) => (
            <div key={article.id} className={`animate-fade-up delay-${index + 1}`}>
              <a
                href={`/article/${article.id}`}
                className="group block"
              >
                <div className="glass glass-hover p-6">
                  <div className="flex items-start gap-5">
                    {/* Rank number */}
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
                      <h3
                        className="text-base font-semibold mb-2 line-clamp-2 leading-snug transition-colors duration-300"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                        <span
                          className="px-2 py-0.5 rounded-full text-[11px]"
                          style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)" }}
                        >
                          {article.category}
                        </span>
                        <span>{article.views.toLocaleString()} 阅读</span>
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
