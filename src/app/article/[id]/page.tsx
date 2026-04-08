import { articles } from '@/data/articles';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }));
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = articles.find((a) => a.id === params.id);

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

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
            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)" }}
            >
              {article.author}
            </span>
            <span>{article.publishedAt}</span>
            <span className="w-1 h-1 rounded-full" style={{ background: "var(--text-muted)" }} />
            <span>{article.views.toLocaleString()} 阅读</span>
          </div>

          {/* Tags */}
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

          {/* Divider */}
          <div className="section-divider mb-8" />

          {/* Content */}
          <div className="space-y-5">
            <p className="text-lg font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {article.excerpt}
            </p>
            <div className="space-y-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <p>
                这是文章的详细内容部分。在实际应用中，这里会包含完整的文章内容，包括段落、图片、引用等。
              </p>
              <p>
                文章内容可以根据需要进行扩展，支持Markdown格式或富文本编辑器格式。
              </p>
              <h2 className="text-2xl font-bold pt-4" style={{ color: "var(--text-primary)" }}>
                技术要点
              </h2>
              <p>
                关键技术点和技术细节可以在这里详细阐述，为读者提供深入的技术分析。
              </p>
            </div>
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
