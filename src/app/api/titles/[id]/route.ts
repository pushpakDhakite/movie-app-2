import { NextResponse } from 'next/server';
import { omdb } from '@/api/omdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  try {
    const movie = await omdb.getById(id);
    if (movie.Response === 'False') {
      return NextResponse.json({ error: 'Title not found' }, { status: 404 });
    }

    return NextResponse.json({
      title: movie,
      cast: omdb.parseActors(movie.Actors),
      crew: {
        directors: omdb.parseDirectors(movie.Director),
        writers: omdb.parseDirectors(movie.Writer),
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch title' }, { status: 500 });
  }
}
