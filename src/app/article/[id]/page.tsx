'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Article } from '@/data/articles';
import { fetchArticle, fetchArticles } from '@/lib/api';

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [article, setArticle] = useState<Article | null | undefined>(undefined);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticle(id).then((data) => {
      setArticle(data);
      if (data) {
        fetchArticles()
          .then((all) =>
            setRelatedArticles(
              all.filter((a) => a.category === data.category && a.id !== data.id).slice(0, 3)
            )
          )
          .catch(() => {});
      }
    });
  }, [id]);

  // Loading
  if (article === undefined) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 rounded" style={{ background: 'var(--bg-surface)' }} />
          <div className="h-[420px] rounded-2xl" style={{ background: 'var(--bg-surface)' }} />
          <div className="h-8 w-3/4 rounded" style={{ background: 'var(--bg-surface)' }} />
        </div>
      </div>
    );
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="transition-colors duration-300 hover:text-[var(--accent-start)]">
          首页
        </Link>
        <span>/</span>
        <Link
          href={`/category/${article.category}`}
          className="transition-colors duration-300 hover:text-[var(--accent-start)]"
        >
          {article.category}
        </Link>
        <span>/</span>
        <span style={{ color: "var(--text-secondary)" }}>{article.title}</span>
      </nav>

      {/* Article Card */}
      <article className="glass overflow-hidden mb-12">
        {/* Cover Image */}
        {article.coverImage && (
          <div className="relative h-64 md:h-[420px]">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, var(--glass-bg) 0%, rgba(17,20,40,0.3) 50%, transparent 100%)",
              }}
            />
          </div>
        )}

        <div className="p-6 md:p-10">
          {/* Category Badge */}
          <span
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-5"
            style={{
              background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))",
              color: "#fff",
            }}
          >
            {article.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-5" style={{ color: "var(--text-primary)" }}>
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            {article.author && (
              <span
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
                style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)" }}
              >
                {article.author}
              </span>
            )}
            <span>{article.publishedAt}</span>
            <span className="w-1 h-1 rounded-full" style={{ background: "var(--text-muted)" }} />
            <span>{article.views.toLocaleString()} 阅读</span>
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="tag-pill px-3 py-1 text-xs rounded-full cursor-pointer"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--text-secondary)",
                    transition: "border-color 0.3s, color 0.3s",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="section-divider mb-8" />

          {/* Content */}
          <div className="space-y-5">
            {article.excerpt && (
              <p className="text-lg font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {article.excerpt}
              </p>
            )}
            {article.content && (
              <div
                className="leading-relaxed whitespace-pre-wrap"
                style={{ color: "var(--text-secondary)" }}
              >
                {article.content}
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="animate-fade-up delay-2">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            相关文章
          </h2>
          <div
            className="w-12 h-0.5 rounded-full mb-8"
            style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedArticles.map((relArticle) => (
              <Link key={relArticle.id} href={`/article/${relArticle.id}`} className="group block">
                <div className="glass glass-hover accent-border overflow-hidden">
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={relArticle.coverImage}
                      alt={relArticle.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to top, var(--bg-card), transparent 60%)",
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3
                      className="text-sm font-semibold line-clamp-2 transition-colors duration-300"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {relArticle.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
