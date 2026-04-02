import { omdb } from '@/api/omdb';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';

interface PersonPageProps {
  params: { id: string };
}

export default async function PersonPage({ params }: PersonPageProps) {
  const name = decodeURIComponent(params.id).replace(/-/g, ' ');
  const results = await omdb.search(name, undefined, 1).catch(() => ({ Search: [], Response: 'False' }));

  const movies = results.Response === 'True' ? results.Search : [];

  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-muted-foreground">
          OMDB does not provide a dedicated person API. Showing titles associated with &ldquo;{name}&rdquo;.
        </p>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map((item) => (
            <Link
              key={item.imdbID}
              href={`/titles/${item.imdbID}`}
              className="group"
            >
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted mb-2">
                {item.Poster && item.Poster !== 'N/A' ? (
                  <img
                    src={item.Poster}
                    alt={item.Title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                    No Image
                  </div>
                )}
              </div>
              <p className="text-sm font-medium line-clamp-1 group-hover:text-gold">{item.Title}</p>
              <p className="text-xs text-muted-foreground">{item.Year}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground">No titles found for &ldquo;{name}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
