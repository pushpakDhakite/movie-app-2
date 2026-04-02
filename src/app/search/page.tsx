import { omdb } from '@/api/omdb';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface SearchPageProps {
  searchParams: { q?: string; type?: string; page?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const type = searchParams.type || 'all';
  const page = parseInt(searchParams.page || '1');

  let results: any[] = [];
  let totalPages = 1;

  if (query) {
    const omdbType = type === 'all' ? undefined : (type as 'movie' | 'series' | 'episode');
    const res = await omdb.search(query, omdbType, page).catch(() => ({ Search: [], totalResults: '0', Response: 'False' }));
    if (res.Response === 'True') {
      results = res.Search;
      totalPages = Math.ceil(parseInt(res.totalResults) / 10);
    }
  }

  const filterTypes = [
    { value: 'all', label: 'All' },
    { value: 'movie', label: 'Movies' },
    { value: 'series', label: 'TV Shows' },
  ];

  return (
    <div className="container py-8 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <form className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              name="q"
              type="search"
              placeholder="Search movies, TV shows..."
              className="pl-10"
              defaultValue={query}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        <div className="flex gap-2">
          {filterTypes.map((t) => (
            <Link
              key={t.value}
              href={`/search?q=${query}&type=${t.value}`}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                type === t.value ? 'bg-primary text-primary-foreground' : 'bg-accent hover:bg-accent/80'
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>

      {query && (
        <p className="text-muted-foreground">
          {results.length} results for &ldquo;{query}&rdquo;
          {type !== 'all' && ` in ${type}`}
        </p>
      )}

      {results.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {results.map((item) => (
              <Link
                key={item.imdbID}
                href={`/titles/${item.imdbID}`}
                className="group"
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted mb-2">
                  {item.Poster && item.Poster !== 'N/A' ? (
                    <Image
                      src={item.Poster}
                      alt={item.Title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      No Image
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium line-clamp-1 group-hover:text-gold">{item.Title}</p>
                <p className="text-xs text-muted-foreground">{item.Year}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-accent rounded text-xs capitalize">
                  {item.Type}
                </span>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {page > 1 && (
                <Link href={`/search?q=${query}&type=${type}&page=${page - 1}`}>
                  <Button variant="outline">Previous</Button>
                </Link>
              )}
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link href={`/search?q=${query}&type=${type}&page=${page + 1}`}>
                  <Button variant="outline">Next</Button>
                </Link>
              )}
            </div>
          )}
        </>
      ) : query ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No results found for &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-muted-foreground mt-2">Try different keywords</p>
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground">Search for movies and TV shows</p>
        </div>
      )}
    </div>
  );
}
