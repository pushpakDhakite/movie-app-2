import { NextResponse } from 'next/server';
import { omdb } from '@/api/omdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  try {
    const data = await omdb.search('popular', 'movie', page);
    if (data.Response === 'False') {
      return NextResponse.json({ results: [], total: 0, page });
    }
    return NextResponse.json({
      results: data.Search.slice(0, limit),
      total: parseInt(data.totalResults),
      page,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch trending' }, { status: 500 });
  }
}
