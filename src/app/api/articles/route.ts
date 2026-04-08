import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

// GET /api/articles — list all articles
export async function GET() {
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: "desc" },
  });
  return NextResponse.json(articles);
}

// POST /api/articles — create article (auth required)
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const body = await request.json();
  const { title, excerpt, content, coverImage, category, tags, publishedAt, author } = body;

  if (!title || !excerpt || !content) {
    return NextResponse.json(
      { error: "标题、摘要和内容不能为空" },
      { status: 400 }
    );
  }

  const article = await prisma.article.create({
    data: {
      title,
      excerpt,
      content,
      coverImage: coverImage || "",
      category: category || "行业动态",
      tags: tags || [],
      publishedAt: publishedAt || new Date().toISOString().split("T")[0],
      author: author || "管理员",
      views: 0,
    },
  });

  return NextResponse.json(article, { status: 201 });
}
