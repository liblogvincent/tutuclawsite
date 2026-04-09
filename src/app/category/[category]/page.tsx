'use client';

import { useState, useEffect, use } from 'react';
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

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data: Article[]) => {
        setArticles(data.filter((a) => a.category === category));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 rounded-2xl" style={{ background: "var(--bg-surface)" }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
      <div className="mb-10">
        <span
          className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4"
          style={{ background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))", color: "#fff" }}
        >
          Category
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          {category}
        </h1>
        <div className="w-12 h-0.5 rounded-full mb-4" style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }} />
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          <span className="font-semibold gradient-text">{articles.length}</span> articles
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article, i) => (
            <div key={article.id} className={`animate-fade-up delay-${Math.min(i + 1, 5)}`}>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p style={{ color: "var(--text-muted)" }}>No articles in this category</p>
        </div>
      )}
    </div>
  );
}
