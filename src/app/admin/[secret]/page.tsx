'use client';

import { useState } from 'react';
import { articles, categories } from '@/data/articles';
import { notFound } from 'next/navigation';

const ADMIN_SECRET = 'Xiaotutu';

export default function AdminPage({ params }: { params: { secret: string } }) {
  if (params.secret !== ADMIN_SECRET) {
    notFound();
  }
  const [activeTab, setActiveTab] = useState('articles');
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);

  const handleEdit = (article: any) => {
    setEditingArticle(article);
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
      author: '',
      views: 0
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    alert('文章已保存！（实际应用中会保存到数据库）');
    setIsEditing(false);
    setEditingArticle(null);
  };

  const tabs = [
    { id: 'articles', label: '文章管理' },
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
                          className="text-xs font-medium transition-colors duration-200"
                          style={{ color: "#ef4444" }}
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
                value={editingArticle.title}
                onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                className="w-full px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                摘要
              </label>
              <textarea
                value={editingArticle.excerpt}
                onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                内容
              </label>
              <textarea
                value={editingArticle.content}
                onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                rows={10}
                className="w-full px-4 py-3 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                  分类
                </label>
                <select
                  value={editingArticle.category}
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
                  封面图片URL
                </label>
                <input
                  type="text"
                  value={editingArticle.coverImage}
                  onChange={(e) => setEditingArticle({ ...editingArticle, coverImage: e.target.value })}
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
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(99, 102, 241, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-fade-up">
          {[
            { label: '总文章数', value: articles.length, icon: '📄' },
            { label: '总阅读量', value: articles.reduce((sum, a) => sum + a.views, 0).toLocaleString(), icon: '👁' },
            { label: '分类数量', value: categories.length, icon: '📂' },
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
