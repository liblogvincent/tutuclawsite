'use client';

import { useState } from 'react';

const tools = [
  {
    name: 'ChatGPT',
    description: 'Advanced conversational AI by OpenAI. General-purpose chat, writing, coding, and analysis.',
    url: 'https://chat.openai.com',
    category: 'Chatbot',
    pricing: 'Free / Paid',
  },
  {
    name: 'Claude',
    description: 'AI assistant by Anthropic. Strong at analysis, coding, and nuanced reasoning.',
    url: 'https://claude.ai',
    category: 'Chatbot',
    pricing: 'Free / Paid',
  },
  {
    name: 'Midjourney',
    description: 'AI image generation with stunning artistic quality. Create visuals from text prompts.',
    url: 'https://midjourney.com',
    category: 'Image',
    pricing: 'Paid',
  },
  {
    name: 'GitHub Copilot',
    description: 'AI pair programmer that suggests code completions and entire functions in your IDE.',
    url: 'https://github.com/features/copilot',
    category: 'Coding',
    pricing: 'Free / Paid',
  },
  {
    name: 'Runway',
    description: 'AI-powered video generation and editing tools for creators.',
    url: 'https://runwayml.com',
    category: 'Video',
    pricing: 'Free / Paid',
  },
  {
    name: 'ElevenLabs',
    description: 'Realistic AI voice generation and text-to-speech with voice cloning.',
    url: 'https://elevenlabs.io',
    category: 'Audio',
    pricing: 'Free / Paid',
  },
  {
    name: 'Perplexity',
    description: 'AI-powered search engine that provides cited, accurate answers.',
    url: 'https://perplexity.ai',
    category: 'Search',
    pricing: 'Free / Paid',
  },
  {
    name: 'Suno',
    description: 'Generate full songs with vocals and instruments from text prompts.',
    url: 'https://suno.ai',
    category: 'Audio',
    pricing: 'Free / Paid',
  },
  {
    name: 'Cursor',
    description: 'AI-first code editor built for pair programming with AI.',
    url: 'https://cursor.sh',
    category: 'Coding',
    pricing: 'Free / Paid',
  },
  {
    name: 'DALL-E 3',
    description: 'OpenAI\'s image generation model integrated into ChatGPT.',
    url: 'https://openai.com/dall-e-3',
    category: 'Image',
    pricing: 'Paid',
  },
  {
    name: 'Notion AI',
    description: 'AI writing and productivity assistant built into Notion workspace.',
    url: 'https://notion.so/product/ai',
    category: 'Productivity',
    pricing: 'Paid',
  },
  {
    name: 'Stable Diffusion',
    description: 'Open-source image generation model. Run locally or use cloud services.',
    url: 'https://stability.ai',
    category: 'Image',
    pricing: 'Free / Paid',
  },
];

const allCategories = ['All', ...Array.from(new Set(tools.map((t) => t.category)))];

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = tools.filter((tool) => {
    const matchCategory = activeCategory === 'All' || tool.category === activeCategory;
    const matchSearch =
      !search ||
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
      <div className="mb-10">
        <span
          className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4"
          style={{ background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))", color: "#fff" }}
        >
          Directory
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          AI Tools
        </h1>
        <div className="w-12 h-0.5 rounded-full mb-4" style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }} />
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Curated collection of the best AI tools — <span className="font-semibold gradient-text">{tools.length}</span> tools and growing.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "var(--text-muted)" }}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)", color: "var(--text-primary)" }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background: activeCategory === cat
                  ? "linear-gradient(135deg, var(--accent-start), var(--accent-end))"
                  : "var(--bg-surface)",
                border: activeCategory === cat ? "none" : "1px solid var(--glass-border)",
                color: activeCategory === cat ? "#fff" : "var(--text-muted)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tool, i) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`animate-fade-up delay-${Math.min(i + 1, 5)}`}
            >
              <div className="glass glass-hover accent-border p-6 h-full">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                    {tool.name}
                  </h3>
                  <svg className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: "var(--text-muted)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {tool.description}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-0.5 text-xs rounded-full"
                    style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)", color: "var(--accent-mid)" }}
                  >
                    {tool.category}
                  </span>
                  <span
                    className="px-2.5 py-0.5 text-xs rounded-full"
                    style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)", color: "var(--text-muted)" }}
                  >
                    {tool.pricing}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p style={{ color: "var(--text-muted)" }}>No tools found</p>
        </div>
      )}
    </div>
  );
}
