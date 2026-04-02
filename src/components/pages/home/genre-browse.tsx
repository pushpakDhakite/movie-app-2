import Link from 'next/link';
import { cn } from '@/utils/format';

interface Genre {
  name: string;
  query: string;
}

interface GenreBrowseProps {
  genres: Genre[];
}

const genreColors: Record<string, string> = {
  Action: 'from-red-600 to-red-800',
  Comedy: 'from-yellow-500 to-orange-600',
  Drama: 'from-blue-600 to-blue-800',
  Horror: 'from-gray-700 to-gray-900',
  'Sci-Fi': 'from-purple-600 to-purple-900',
  Romance: 'from-pink-500 to-pink-700',
  Thriller: 'from-green-600 to-green-800',
  Fantasy: 'from-indigo-500 to-indigo-700',
  Animation: 'from-cyan-500 to-cyan-700',
  Documentary: 'from-amber-600 to-amber-800',
};

export function GenreBrowse({ genres }: GenreBrowseProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Browse by Genre</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {genres.map((genre) => (
          <Link
            key={genre.name}
            href={`/search?q=${encodeURIComponent(genre.query)}`}
            className={cn(
              'relative p-6 rounded-lg text-white font-semibold text-center transition-transform hover:scale-105 bg-gradient-to-br',
              genreColors[genre.name] || 'from-gray-600 to-gray-800'
            )}
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
