import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const articleId = searchParams.get('articleId');
  const all = searchParams.get('all');

  if (all === 'true') {
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: 'desc' },
      include: { article: { select: { title: true } } },
    });
    return NextResponse.json(comments);
  }

  if (!articleId) {
    return NextResponse.json({ error: 'Missing articleId parameter' }, { status: 400 });
  }

  const comments = await prisma.comment.findMany({
    where: { articleId },
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json(comments);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { articleId, nickname, content } = body;

    if (!articleId || !nickname?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: 'Nickname and content are required' },
        { status: 400 }
      );
    }

    if (nickname.trim().length > 20) {
      return NextResponse.json(
        { error: 'Nickname must be 20 characters or less' },
        { status: 400 }
      );
    }

    if (content.trim().length > 1000) {
      return NextResponse.json(
        { error: 'Comment must be 1000 characters or less' },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        articleId,
        nickname: nickname.trim(),
        content: content.trim(),
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}
