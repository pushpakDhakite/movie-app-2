import { omdb } from '@/api/omdb';
import { TitleCard } from '@/components/shared/title-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const GENRES = [
  'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller',
  'Sci-Fi', 'Fantasy', 'Animation', 'Documentary', 'Crime', 'Mystery',
  'Adventure', 'War', 'Family', 'History', 'Music', 'Western',
];

export default async function MoviesPage() {
  const genreResults = await Promise.all(
    GENRES.map(async (genre) => {
      try {
        const res = await omdb.search(genre, 'movie', 1);
        return {
          genre,
          items: res.Response === 'True' ? res.Search : [],
        };
      } catch {
        return { genre, items: [] };
      }
    })
  );

  return (
    <div className="space-y-10">
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Movies</h1>
        <p className="text-muted-foreground mt-1">Browse movies by genre</p>
      </div>

      {genreResults.map(({ genre, items }) => (
        items.length > 0 && (
          <section key={genre} className="px-4 md:px-0">
            <div className="container">
              <h2 className="text-xl font-semibold mb-4">{genre}</h2>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-4 pb-4">
                  {items.map((item) => (
                    <div key={item.imdbID} className="w-[200px] flex-shrink-0">
                      <TitleCard
                        id={item.imdbID}
                        title={item.Title}
                        posterUrl={item.Poster}
                        year={item.Year}
                        type={item.Type}
                      />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </section>
        )
      ))}
    </div>
  );
}
