'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const categories = ['行业动态', '科技前沿', '企业动态', '学术动态', '技术突破'];

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
      category: '行业动态',
      tags: [],
      publishedAt: new Date().toISOString().split('T')[0],
      author: '管理员',
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
        alert(data.error || '保存失败');
      }
    } catch {
      alert('网络错误，请重试');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这篇文章吗？')) return;

    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchArticles();
      }
    } catch {
      alert('删除失败');
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
        alert(data.error || '上传失败');
      }
    } catch {
      alert('上传失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (!confirm('确定要删除这条评论吗？')) return;

    try {
      const res = await fetch(`/api/comments/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchComments();
      }
    } catch {
      alert('删除失败');
    }
  };

  const tabs = [
    { id: 'articles', label: '文章管理' },
    { id: 'comments', label: '评论管理' },
    { id: 'stats', label: '数据统计' },
    { id: 'settings', label: '网站设置' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            后台管理
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
            + 新建文章
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
            退出登录
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
                  {['标题', '分类', '发布日期', '阅读量', '操作'].map((th) => (
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
                          编辑
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="text-xs font-medium transition-colors duration-200"
                          style={{ color: "#ef4444" }}
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {articles.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                      暂无文章，点击"新建文章"开始创作
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
                  {['昵称', '评论内容', '所属文章', '时间', '操作'].map((th) => (
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
                        {comment.article?.title || '未知文章'}
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
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
                {comments.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                      暂无评论
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
            {editingArticle.id ? '编辑文章' : '新建文章'}
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                标题
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
                摘要
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
                  内容（Markdown）
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
                  {uploading ? '上传中...' : '+ 插入图片'}
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
                  分类
                </label>
                <select
                  value={editingArticle.category || '行业动态'}
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
                  封面图片
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="图片URL或上传"
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
                    {uploading ? '上传中...' : '上传图片'}
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
                      alt="封面预览"
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
                  作者
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
                  标签（逗号分隔）
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
                取消
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
                {saving ? '保存中...' : '保存'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-fade-up">
          {[
            { label: '总文章数', value: articles.length },
            { label: '总阅读量', value: articles.reduce((sum, a) => sum + a.views, 0).toLocaleString() },
            { label: '分类数量', value: new Set(articles.map(a => a.category)).size },
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
            网站设置
          </h2>
          <p style={{ color: "var(--text-muted)" }}>网站设置功能开发中...</p>
        </div>
      )}
    </div>
  );
}
