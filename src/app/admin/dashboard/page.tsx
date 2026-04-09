'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const categories = ['Industry', 'Tech', 'Business', 'Academia', 'Breakthroughs'];

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

interface CommentWithArticle {
  id: string;
  nickname: string;
  content: string;
  createdAt: string;
  article: { title: string };
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [comments, setComments] = useState<CommentWithArticle[]>([]);
  const [activeTab, setActiveTab] = useState('articles');
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const fetchArticles = useCallback(async () => {
    const res = await fetch('/api/articles');
    if (res.ok) {
      const data = await res.json();
      setArticles(data);
    }
  }, []);

  const fetchComments = useCallback(async () => {
    const res = await fetch('/api/comments?all=true');
    if (res.ok) {
      const data = await res.json();
      setComments(data);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
    fetchComments();
  }, [fetchArticles, fetchComments]);

  const handleEdit = (article: Article) => {
    setEditingArticle({ ...article });
    setIsEditing(true);
  };

  const handleNewArticle = () => {
    setEditingArticle({
      id: '',
      title: '',
      excerpt: '',
      content: '',
      coverImage: '',
      category: 'Industry',
      tags: [],
      publishedAt: new Date().toISOString().split('T')[0],
      author: 'Admin',
      views: 0,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editingArticle) return;
    setSaving(true);

    try {
      const isEdit = !!editingArticle.id;
      const url = isEdit ? `/api/articles/${editingArticle.id}` : '/api/articles';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingArticle),
      });

      if (res.ok) {
        setIsEditing(false);
        setEditingArticle(null);
        fetchArticles();
      } else {
        const data = await res.json();
        alert(data.error || 'Save failed');
      }
    } catch {
      alert('Network error, please retry');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchArticles();
      }
    } catch {
      alert('Delete failed');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleUpload = async (
    file: File,
    onDone: (url: string) => void
  ) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        onDone(data.url);
      } else {
        const data = await res.json();
        alert(data.error || 'Upload failed');
      }
    } catch {
      alert('Upload failed, please retry');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const res = await fetch(`/api/comments/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchComments();
      }
    } catch {
      alert('Delete failed');
    }
  };

  const tabs = [
    { id: 'articles', label: 'Articles' },
    { id: 'comments', label: 'Comments' },
    { id: 'stats', label: 'Stats' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Dashboard
          </h1>
          <div
            className="w-12 h-0.5 rounded-full mt-2"
            style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }}
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleNewArticle}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))",
              color: "#fff",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(99, 102, 241, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            + New Article
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--glass-border)",
              color: "var(--text-secondary)",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass mb-6 p-1.5 inline-flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
            style={{
              background: activeTab === tab.id
                ? "linear-gradient(135deg, var(--accent-start), var(--accent-end))"
                : "transparent",
              color: activeTab === tab.id
                ? "#fff"
                : "var(--text-muted)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Articles Tab */}
      {activeTab === 'articles' && !isEditing && (
        <div className="glass overflow-hidden animate-fade-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
                  {['Title', 'Category', 'Published', 'Views', 'Actions'].map((th) => (
                    <th
                      key={th}
                      className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="transition-colors duration-200"
                    style={{ borderBottom: "1px solid var(--glass-border)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--bg-surface)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        {article.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-2.5 py-1 text-xs rounded-full"
                        style={{
                          background: "var(--bg-surface)",
                          border: "1px solid var(--glass-border)",
                          color: "var(--accent-mid)",
                        }}
                      >
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: "var(--text-muted)" }}>
                      {article.publishedAt}
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: "var(--text-muted)" }}>
                      {article.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(article)}
                          className="text-xs font-medium transition-colors duration-200"
                          style={{ color: "var(--accent-start)" }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="text-xs font-medium transition-colors duration-200"
                          style={{ color: "#ef4444" }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {articles.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                      No articles yet. Click "+ New Article" to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Comments Tab */}
      {activeTab === 'comments' && (
        <div className="glass overflow-hidden animate-fade-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
                  {['Nickname', 'Comment', 'Article', 'Date', 'Actions'].map((th) => (
                    <th
                      key={th}
                      className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr
                    key={comment.id}
                    className="transition-colors duration-200"
                    style={{ borderBottom: "1px solid var(--glass-border)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--bg-surface)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        {comment.nickname}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm line-clamp-2 max-w-xs" style={{ color: "var(--text-secondary)" }}>
                        {comment.content}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm" style={{ color: "var(--accent-mid)" }}>
                        {comment.article?.title || 'Unknown article'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: "var(--text-muted)" }}>
                      {new Date(comment.createdAt).toLocaleDateString('zh-CN')}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-xs font-medium transition-colors duration-200"
                        style={{ color: "#ef4444" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {comments.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                      No comments yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Form */}
      {isEditing && editingArticle && (
        <div className="glass p-8 animate-fade-up">
          <h2 className="text-xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
            {editingArticle.id ? 'Edit Article' : 'New Article'}
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                Title
              </label>
              <input
                type="text"
                value={editingArticle.title || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                className="w-full px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                Excerpt
              </label>
              <textarea
                value={editingArticle.excerpt || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 text-sm"
              />
            </div>

            <div data-color-mode="dark">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                  Content (Markdown)
                </label>
                <label
                  className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--accent-start)",
                    opacity: uploading ? 0.5 : 1,
                  }}
                >
                  {uploading ? 'Uploading...' : '+ Insert Image'}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleUpload(file, (url) => {
                          const imgMd = `\n![${file.name}](${url})\n`;
                          setEditingArticle({
                            ...editingArticle,
                            content: (editingArticle.content || '') + imgMd,
                          });
                        });
                      }
                      e.target.value = '';
                    }}
                  />
                </label>
              </div>
              <MDEditor
                value={editingArticle.content || ''}
                onChange={(val) => setEditingArticle({ ...editingArticle, content: val || '' })}
                height={400}
                preview="live"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                  Category
                </label>
                <select
                  value={editingArticle.category || 'Industry'}
                  onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                  className="w-full px-4 py-3 text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                  Cover Image
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Image URL or upload"
                    value={editingArticle.coverImage || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, coverImage: e.target.value })}
                    className="flex-1 px-4 py-3 text-sm"
                  />
                  <label
                    className="px-4 py-3 rounded-xl text-sm font-medium cursor-pointer whitespace-nowrap"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--glass-border)",
                      color: "var(--accent-start)",
                      opacity: uploading ? 0.5 : 1,
                    }}
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleUpload(file, (url) =>
                            setEditingArticle({ ...editingArticle, coverImage: url })
                          );
                        }
                        e.target.value = '';
                      }}
                    />
                  </label>
                </div>
                {editingArticle.coverImage && (
                  <div className="mt-2">
                    <img
                      src={editingArticle.coverImage}
                      alt="Cover preview"
                      className="h-24 rounded-lg object-cover"
                      style={{ border: "1px solid var(--glass-border)" }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                  Author
                </label>
                <input
                  type="text"
                  value={editingArticle.author || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                  className="w-full px-4 py-3 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={(editingArticle.tags || []).join(', ')}
                  onChange={(e) => setEditingArticle({
                    ...editingArticle,
                    tags: e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean),
                  })}
                  className="w-full px-4 py-3 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingArticle(null);
                }}
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--text-secondary)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))",
                  color: "#fff",
                  opacity: saving ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!saving) e.currentTarget.style.boxShadow = "0 4px 20px rgba(99, 102, 241, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-fade-up">
          {[
            { label: 'Total Articles', value: articles.length },
            { label: 'Total Views', value: articles.reduce((sum, a) => sum + a.views, 0).toLocaleString() },
            { label: 'Categories', value: new Set(articles.map(a => a.category)).size },
          ].map((stat, i) => (
            <div key={stat.label} className={`glass glass-hover p-6 animate-fade-up delay-${i + 1}`}>
              <p className="text-sm font-medium mb-1" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </p>
              <p className="text-4xl font-bold gradient-text">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="glass p-8 animate-fade-up">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Settings
          </h2>
          <p style={{ color: "var(--text-muted)" }}>Settings coming soon...</p>
        </div>
      )}
    </div>
  );
}
