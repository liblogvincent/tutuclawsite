import { articles, categories } from '@/data/articles';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category,
  }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryArticles = articles.filter((a) => a.category === params.category);

  if (categoryArticles.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
      {/* Header */}
      <div className="mb-10">
        <span
          className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4"
          style={{
            background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))",
            color: "#fff",
          }}
        >
          分类
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          {params.category}
        </h1>
        <div
          className="w-12 h-0.5 rounded-full mb-4"
          style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }}
        />
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          共 <span className="font-semibold gradient-text">{categoryArticles.length}</span> 篇文章
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categoryArticles.map((article, i) => (
          <div key={article.id} className={`animate-fade-up delay-${Math.min(i + 1, 5)}`}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}
