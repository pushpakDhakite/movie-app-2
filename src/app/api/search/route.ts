import { NextResponse } from 'next/server';
import { omdb } from '@/api/omdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const type = searchParams.get('type') || undefined;
  const page = parseInt(searchParams.get('page') || '1');

  if (!q) {
    return NextResponse.json({ results: [], total: 0, page, totalPages: 0 });
  }

  try {
    const data = await omdb.search(q, type as 'movie' | 'series' | 'episode', page);
    if (data.Response === 'False') {
      return NextResponse.json({ results: [], total: 0, page, totalPages: 0 });
    }
    return NextResponse.json({
      results: data.Search,
      total: parseInt(data.totalResults),
      page,
      totalPages: Math.ceil(parseInt(data.totalResults) / 10),
    });
  } catch {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
