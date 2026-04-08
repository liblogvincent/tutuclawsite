'use client';

import { useState, useEffect, use, useCallback } from 'react';
import { notFound } from 'next/navigation';
import { Article, categories as staticCategories } from '@/data/articles';
import {
  adminLogin,
  adminVerify,
  fetchArticles,
  adminCreateArticle,
  adminUpdateArticle,
  adminDeleteArticle,
} from '@/lib/api';

const ADMIN_SECRET = 'Xiaotutu';

const EMPTY_ARTICLE: Omit<Article, 'id' | 'views'> = {
  title: '',
  excerpt: '',
  content: '',
  coverImage: '',
  category: '行业动态',
  tags: [],
  publishedAt: new Date().toISOString().split('T')[0],
  author: '',
};

// ── Input / Textarea helpers ──────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  background: 'var(--bg-surface)',
  border: '1px solid var(--glass-border)',
  color: 'var(--text-primary)',
  borderRadius: '0.75rem',
  outline: 'none',
  width: '100%',
  padding: '0.75rem 1rem',
  fontSize: '0.875rem',
};

// ── Main component ────────────────────────────────────────────────────────────

export default function AdminPage({ params }: { params: Promise<{ secret: string }> }) {
  const { secret } = use(params);
  if (secret !== ADMIN_SECRET) {
    notFound();
  }

  // Auth state
  const [token, setToken] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Article state
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [activeTab, setActiveTab] = useState('articles');
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticle, setEditingArticle] = useState<(Omit<Article, 'id' | 'views'> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [tagsInput, setTagsInput] = useState('');

  // ── Load token from localStorage on mount ──────────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem('admin_token');
    if (stored) {
      adminVerify(stored)
        .then((res) => {
          if (res.valid) setToken(stored);
        })
        .catch(() => {})
        .finally(() => setAuthChecked(true));
    } else {
      setAuthChecked(true);
    }
  }, []);

  // ── Load articles when authenticated ───────────────────────────────────────
  const loadArticles = useCallback(async () => {
    setLoadingArticles(true);
    try {
      const data = await fetchArticles();
      setArticles(data);
    } catch {
      // ignore
    } finally {
      setLoadingArticles(false);
    }
  }, []);

  useEffect(() => {
    if (token) loadArticles();
  }, [token, loadArticles]);

  // ── Auth handlers ──────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const { token: t } = await adminLogin(loginUsername, loginPassword);
      localStorage.setItem('admin_token', t);
      setToken(t);
    } catch {
      setLoginError('用户名或密码错误');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setArticles([]);
  };

  // ── Article handlers ───────────────────────────────────────────────────────
  const handleEdit = (article: Article) => {
    setEditingArticle({ ...article });
    setTagsInput(article.tags.join(', '));
    setSaveError('');
    setIsEditing(true);
  };

  const handleNewArticle = () => {
    setEditingArticle({ ...EMPTY_ARTICLE });
    setTagsInput('');
    setSaveError('');
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editingArticle || !token) return;
    setSaving(true);
    setSaveError('');
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const payload = { ...editingArticle, tags };
    try {
      if (editingArticle.id) {
        await adminUpdateArticle(token, editingArticle.id, payload);
      } else {
        await adminCreateArticle(token, payload as Omit<Article, 'id' | 'views'>);
      }
      await loadArticles();
      setIsEditing(false);
      setEditingArticle(null);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : '保存失败，请重试');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await adminDeleteArticle(token, id);
      setDeleteConfirm(null);
      await loadArticles();
    } catch {
      // ignore
    }
  };

  const tabs = [
    { id: 'articles', label: '文章管理' },
    { id: 'stats', label: '数据统计' },
    { id: 'settings', label: '网站设置' },
  ];

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (!authChecked) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded" style={{ background: 'var(--bg-surface)' }} />
          <div className="h-12 w-full rounded-xl" style={{ background: 'var(--bg-surface)' }} />
        </div>
      </div>
    );
  }

  // ── Login form ─────────────────────────────────────────────────────────────
  if (!token) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 animate-fade-up">
        <div className="glass p-8">
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            管理员登录
          </h1>
          <div
            className="w-12 h-0.5 rounded-full mb-8"
            style={{ background: 'linear-gradient(90deg, var(--accent-start), var(--accent-end))' }}
          />
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                用户名
              </label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                style={inputStyle}
                autoComplete="username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                密码
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={inputStyle}
                autoComplete="current-password"
                required
              />
            </div>
            {loginError && (
              <p className="text-sm" style={{ color: '#ef4444' }}>{loginError}</p>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--accent-start), var(--accent-end))',
                color: '#fff',
                opacity: loginLoading ? 0.7 : 1,
              }}
            >
              {loginLoading ? '登录中...' : '登录'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Authenticated dashboard ────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            后台管理
          </h1>
          <div
            className="w-12 h-0.5 rounded-full mt-2"
            style={{ background: 'linear-gradient(90deg, var(--accent-start), var(--accent-end))' }}
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleNewArticle}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, var(--accent-start), var(--accent-end))',
              color: '#fff',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            + 新建文章
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-muted)',
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
              background:
                activeTab === tab.id
                  ? 'linear-gradient(135deg, var(--accent-start), var(--accent-end))'
                  : 'transparent',
              color: activeTab === tab.id ? '#fff' : 'var(--text-muted)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Articles Tab */}
      {activeTab === 'articles' && !isEditing && (
        <div className="glass overflow-hidden animate-fade-up">
          {loadingArticles ? (
            <div className="p-10 text-center" style={{ color: 'var(--text-muted)' }}>
              加载中...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    {['标题', '分类', '发布日期', '阅读量', '操作'].map((th) => (
                      <th
                        key={th}
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {th}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {articles.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-10 text-center text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        暂无文章，点击「新建文章」开始创作
                      </td>
                    </tr>
                  ) : (
                    articles.map((article) => (
                      <tr
                        key={article.id}
                        className="transition-colors duration-200"
                        style={{ borderBottom: '1px solid var(--glass-border)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--bg-surface)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                            {article.title}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="px-2.5 py-1 text-xs rounded-full"
                            style={{
                              background: 'var(--bg-surface)',
                              border: '1px solid var(--glass-border)',
                              color: 'var(--accent-mid)',
                            }}
                          >
                            {article.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                          {article.publishedAt}
                        </td>
                        <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                          {article.views.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleEdit(article)}
                              className="text-xs font-medium transition-colors duration-200"
                              style={{ color: 'var(--accent-start)' }}
                            >
                              编辑
                            </button>
                            {deleteConfirm === article.id ? (
                              <>
                                <button
                                  onClick={() => handleDelete(article.id)}
                                  className="text-xs font-medium"
                                  style={{ color: '#ef4444' }}
                                >
                                  确认删除
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="text-xs font-medium"
                                  style={{ color: 'var(--text-muted)' }}
                                >
                                  取消
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirm(article.id)}
                                className="text-xs font-medium transition-colors duration-200"
                                style={{ color: '#ef4444' }}
                              >
                                删除
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Edit / Create Form */}
      {isEditing && editingArticle && (
        <div className="glass p-8 animate-fade-up">
          <h2 className="text-xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
            {editingArticle.id ? '编辑文章' : '新建文章'}
          </h2>

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                标题 <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                value={editingArticle.title}
                onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                style={inputStyle}
                placeholder="文章标题"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                摘要
              </label>
              <textarea
                value={editingArticle.excerpt}
                onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                rows={3}
                style={inputStyle}
                placeholder="文章摘要（可选）"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                内容
              </label>
              <textarea
                value={editingArticle.content}
                onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                rows={12}
                style={inputStyle}
                placeholder="文章正文内容"
              />
            </div>

            {/* Category + Cover Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  分类
                </label>
                <select
                  value={editingArticle.category}
                  onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                  style={inputStyle}
                >
                  {staticCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  封面图片 URL
                </label>
                <input
                  type="text"
                  value={editingArticle.coverImage}
                  onChange={(e) => setEditingArticle({ ...editingArticle, coverImage: e.target.value })}
                  style={inputStyle}
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Author + Published At */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  作者
                </label>
                <input
                  type="text"
                  value={editingArticle.author}
                  onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                  style={inputStyle}
                  placeholder="作者姓名"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  发布日期
                </label>
                <input
                  type="date"
                  value={editingArticle.publishedAt}
                  onChange={(e) => setEditingArticle({ ...editingArticle, publishedAt: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                标签（逗号分隔）
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                style={inputStyle}
                placeholder="标签1, 标签2, 标签3"
              />
            </div>

            {saveError && (
              <p className="text-sm" style={{ color: '#ef4444' }}>{saveError}</p>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingArticle(null);
                  setSaveError('');
                }}
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-secondary)',
                }}
              >
                取消
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-start), var(--accent-end))',
                  color: '#fff',
                  opacity: saving ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!saving) e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
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
            {
              label: '总阅读量',
              value: articles.reduce((sum, a) => sum + a.views, 0).toLocaleString(),
            },
            {
              label: '分类数量',
              value: new Set(articles.map((a) => a.category)).size,
            },
          ].map((stat, i) => (
            <div key={stat.label} className={`glass glass-hover p-6 animate-fade-up delay-${i + 1}`}>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </p>
              <p className="text-4xl font-bold gradient-text">{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="glass p-8 animate-fade-up">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            网站设置
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>网站设置功能开发中...</p>
        </div>
      )}
    </div>
  );
}
