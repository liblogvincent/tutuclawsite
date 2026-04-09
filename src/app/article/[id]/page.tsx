'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

interface Comment {
  id: string;
  nickname: string;
  content: string;
  createdAt: string;
}

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [nickname, setNickname] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);

  const fetchComments = () => {
    fetch(`/api/comments?articleId=${id}`)
      .then((r) => r.json())
      .then((data) => setComments(data))
      .catch(() => {});
  };

  useEffect(() => {
    Promise.all([
      fetch(`/api/articles/${id}`).then((r) => r.json()),
      fetch('/api/articles').then((r) => r.json()),
    ])
      .then(([art, allArticles]) => {
        setArticle(art);
        setRelated(
          allArticles.filter(
            (a: Article) => a.category === art.category && a.id !== art.id
          ).slice(0, 3)
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
    fetchComments();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setReadProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !commentText.trim()) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId: id, nickname, content: commentText }),
      });
      if (res.ok) {
        setCommentText('');
        fetchComments();
      } else {
        const data = await res.json();
        alert(data.error || 'Comment failed');
      }
    } catch {
      alert('Network error, please retry');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString('zh-CN');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-64 md:h-[420px] rounded-2xl" style={{ background: "var(--bg-surface)" }} />
          <div className="h-8 w-3/4 rounded" style={{ background: "var(--bg-surface)" }} />
          <div className="h-4 w-1/2 rounded" style={{ background: "var(--bg-surface)" }} />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p style={{ color: "var(--text-muted)" }}>Article not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
      {/* Reading Progress Bar */}
      <div className="reading-progress" style={{ width: `${readProgress}%` }} />
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
        <Link href="/" className="transition-colors duration-300 hover:text-[var(--accent-start)]">
          Home
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
        <div className="relative h-64 md:h-[420px]">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, var(--glass-bg) 0%, rgba(17,20,40,0.3) 50%, transparent 100%)",
            }}
          />
        </div>

        <div className="p-6 md:p-10">
          <span
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-5"
            style={{ background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))", color: "#fff" }}
          >
            {article.category}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-5" style={{ color: "var(--text-primary)" }}>
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)" }}
            >
              {article.author}
            </span>
            <span>{article.publishedAt}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="tag-pill px-3 py-1 text-xs rounded-full cursor-pointer"
                style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)", color: "var(--text-secondary)", transition: "border-color 0.3s, color 0.3s" }}
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="section-divider mb-8" />

          <div className="space-y-5">
            <p className="text-lg font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {article.excerpt}
            </p>
            <div className="markdown-body leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="glass p-6 md:p-8 mb-12 animate-fade-up delay-1">
        <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
          Comments ({comments.length})
        </h2>
        <div className="w-12 h-0.5 rounded-full mb-6" style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }} />

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-8 space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={20}
              className="flex-shrink-0 w-40 px-4 py-2.5 text-sm"
              required
            />
          </div>
          <textarea
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            maxLength={1000}
            rows={3}
            className="w-full px-4 py-3 text-sm"
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))",
                color: "#fff",
                opacity: submitting ? 0.6 : 1,
              }}
            >
              {submitting ? 'Submitting...' : 'Post Comment'}
            </button>
          </div>
        </form>

        {/* Comment List */}
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-xl"
                style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))",
                      color: "#fff",
                    }}
                  >
                    {comment.nickname.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {comment.nickname}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {formatTimeAgo(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed pl-11" style={{ color: "var(--text-secondary)" }}>
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            No comments yet. Be the first to comment!
          </p>
        )}
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="animate-fade-up delay-2">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Related Articles</h2>
          <div className="w-12 h-0.5 rounded-full mb-8" style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((relArticle) => (
              <Link key={relArticle.id} href={`/article/${relArticle.id}`} className="group block">
                <div className="glass glass-hover accent-border overflow-hidden">
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={relArticle.coverImage}
                      alt={relArticle.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--bg-card), transparent 60%)" }} />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold line-clamp-2" style={{ color: "var(--text-primary)" }}>
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
