export interface Article {
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

export const articles: Article[] = [
  {
    id: "1",
    title: "示例文章标题 1 - 如何开始使用我们的平台",
    excerpt: "这是第一篇文章的简短摘要，介绍平台的主要功能和使用方法。",
    content: "这是文章的详细内容部分。您可以在这里添加完整的文章内容，包括多个段落、图片、代码示例等。\n\n在实际应用中，这部分内容可以从数据库或CMS系统中获取。",
    coverImage: "https://picsum.photos/800/400?random=1",
    category: "行业动态",
    tags: ["教程", "入门", "平台"],
    publishedAt: "2026-04-01",
    author: "管理员",
    views: 1250
  },
  {
    id: "2",
    title: "示例文章标题 2 - 最新功能更新说明",
    excerpt: "介绍最近添加的新功能和改进，帮助用户更好地使用平台。",
    content: "详细内容会在实际应用中从数据库加载...",
    coverImage: "https://picsum.photos/800/400?random=2",
    category: "科技前沿",
    tags: ["更新", "功能", "新特性"],
    publishedAt: "2026-04-02",
    author: "管理员",
    views: 980
  },
  {
    id: "3",
    title: "示例文章标题 3 - 用户体验优化指南",
    excerpt: "分享提升用户体验的最佳实践和实用技巧。",
    content: "详细内容会在实际应用中从数据库加载...",
    coverImage: "https://picsum.photos/800/400?random=3",
    category: "企业动态",
    tags: ["用户体验", "优化", "最佳实践"],
    publishedAt: "2026-04-03",
    author: "管理员",
    views: 850
  },
  {
    id: "4",
    title: "示例文章标题 4 - 技术架构深度解析",
    excerpt: "深入了解平台的技术架构和设计理念。",
    content: "详细内容会在实际应用中从数据库加载...",
    coverImage: "https://picsum.photos/800/400?random=4",
    category: "学术动态",
    tags: ["技术", "架构", "设计"],
    publishedAt: "2026-04-04",
    author: "管理员",
    views: 1520
  },
  {
    id: "5",
    title: "示例文章标题 5 - 未来发展规划",
    excerpt: "展望平台的发展方向和未来计划。",
    content: "详细内容会在实际应用中从数据库加载...",
    coverImage: "https://picsum.photos/800/400?random=5",
    category: "技术突破",
    tags: ["规划", "未来", "发展"],
    publishedAt: "2026-04-05",
    author: "管理员",
    views: 730
  }
];

export const categories = ["行业动态", "科技前沿", "企业动态", "学术动态", "技术突破"];
