import Link from 'next/link';
import { Article } from '@/data/articles';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <Link href={`/article/${article.id}`} className="group block">
        <div
          className="glass glass-hover shimmer-overlay card-lift overflow-hidden"
          style={{ borderRadius: "var(--radius)" }}
        >
          <div className="relative h-72 md:h-[420px]">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, var(--bg-primary) 0%, rgba(7,8,15,0.6) 40%, transparent 100%)",
              }}
            />
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span
                className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4"
                style={{
                  background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))",
                  color: "#fff",
                }}
              >
                {article.category}
              </span>
              <h2 className="text-2xl md:text-4xl font-bold mb-3 leading-tight" style={{ color: "var(--text-primary)" }}>
                {article.title}
              </h2>
              <p className="text-sm md:text-base mb-3 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                {article.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                <span>{article.publishedAt}</span>
                <span className="w-1 h-1 rounded-full" style={{ background: "var(--text-muted)" }} />
                <span>{article.author}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.id}`} className="group block">
      <div
        className="glass glass-hover accent-border card-lift h-full overflow-hidden flex flex-col"
        style={{ borderRadius: "var(--radius)" }}
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, var(--bg-card) 0%, transparent 60%)",
            }}
          />
          <span
            className="absolute top-3 left-3 px-2.5 py-0.5 text-[11px] font-semibold rounded-full"
            style={{
              background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))",
              color: "#fff",
            }}
          >
            {article.category}
          </span>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <h3
            className="text-base font-semibold mb-2 line-clamp-2 leading-snug transition-colors duration-300"
            style={{ color: "var(--text-primary)" }}
          >
            {article.title}
          </h3>
          <p className="text-sm mb-4 line-clamp-2 flex-1" style={{ color: "var(--text-secondary)" }}>
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
            <span>{article.publishedAt}</span>
            <span>{article.author}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
