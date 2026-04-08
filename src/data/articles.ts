// Article interface — shared across the entire application.
// The static `articles` array has been removed; all article data is now
// served from the PostgreSQL-backed API at /api/articles.
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

// Default category list used by the admin form's category selector.
// New categories are created dynamically as articles are added.
export const categories = ["行业动态", "科技前沿", "企业动态", "学术动态", "技术突破"];
