import { omdb } from '@/api/omdb';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Calendar, Award, Globe, Film, Tv } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getRatingBgColor, getRatingColor } from '@/utils/format';

interface TitlePageProps {
  params: { id: string };
}

export default async function TitlePage({ params }: TitlePageProps) {
  const movie = await omdb.getById(params.id).catch(() => null);
  if (!movie || movie.Response === 'False') notFound();

  const rating = parseFloat(movie.imdbRating) || 0;
  const ratingPercent = Math.round(rating * 10);
  const runtimeMin = omdb.parseRuntime(movie.Runtime);
  const year = omdb.parseYear(movie.Year);
  const genres = omdb.parseGenres(movie.Genre);
  const actors = omdb.parseActors(movie.Actors);
  const directors = omdb.parseDirectors(movie.Director);
  const writers = omdb.parseDirectors(movie.Writer);
  const isSeries = movie.Type === 'series';

  return (
    <div className="space-y-8">
      <div className="relative">
        {movie.Poster && movie.Poster !== 'N/A' && (
          <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
            <Image
              src={movie.Poster}
              alt={movie.Title}
              fill
              className="object-cover blur-sm scale-110"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          </div>
        )}

        <div className="container relative -mt-32 pb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="relative w-[240px] aspect-[2/3] rounded-lg overflow-hidden shadow-2xl bg-muted">
                {movie.Poster && movie.Poster !== 'N/A' ? (
                  <Image
                    src={movie.Poster}
                    alt={movie.Title}
                    fill
                    className="object-cover"
                    sizes="240px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Poster
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {movie.Title}
                  {year && <span className="text-muted-foreground font-normal"> ({year})</span>}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-2 py-0.5 bg-gold/20 text-gold rounded text-xs font-medium uppercase">
                    {isSeries ? 'TV Series' : 'Movie'}
                  </span>
                  {movie.Rated && movie.Rated !== 'N/A' && (
                    <span className="px-2 py-0.5 border rounded text-xs">{movie.Rated}</span>
                  )}
                  {movie.Runtime && movie.Runtime !== 'N/A' && (
                    <span className="text-sm text-muted-foreground">{movie.Runtime}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className={`relative w-14 h-14 rounded-full ${getRatingBgColor(rating)} flex items-center justify-center`}>
                    <span className="text-lg font-bold text-white">{rating.toFixed(1)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-gold fill-gold" />
                      <span className="font-semibold">{movie.imdbRating}/10</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{movie.imdbVotes} votes</p>
                  </div>
                </div>

                {movie.Ratings.map((r, i) => (
                  <div key={i} className="text-sm">
                    <p className="font-medium">{r.Source}</p>
                    <p className="text-muted-foreground">{r.Value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {genres.map((g) => (
                  <Link
                    key={g}
                    href={`/search?q=${g}`}
                    className="px-3 py-1 bg-accent rounded-full text-sm hover:bg-accent/80 transition-colors"
                  >
                    {g}
                  </Link>
                ))}
              </div>

              {movie.Plot && movie.Plot !== 'N/A' && (
                <p className="text-muted-foreground">{movie.Plot}</p>
              )}

              {movie.Awards && movie.Awards !== 'N/A' && (
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-gold" />
                  <span>{movie.Awards}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <Button>Add to Watchlist</Button>
                <Button variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  Rate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <Tabs defaultValue="overview">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cast">Cast & Crew</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                {movie.Plot && movie.Plot !== 'N/A' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Storyline</h2>
                    <p className="text-muted-foreground">{movie.Plot}</p>
                  </div>
                )}
              </div>
              <div className="space-y-4 text-sm">
                {directors.length > 0 && directors[0] !== 'N/A' && (
                  <div>
                    <span className="font-semibold">Director:</span>{' '}
                    <span className="text-muted-foreground">{movie.Director}</span>
                  </div>
                )}
                {writers.length > 0 && writers[0] !== 'N/A' && (
                  <div>
                    <span className="font-semibold">Writer:</span>{' '}
                    <span className="text-muted-foreground">{movie.Writer}</span>
                  </div>
                )}
                {actors.length > 0 && actors[0] !== 'N/A' && (
                  <div>
                    <span className="font-semibold">Stars:</span>{' '}
                    <span className="text-muted-foreground">{movie.Actors}</span>
                  </div>
                )}
                {movie.Language && movie.Language !== 'N/A' && (
                  <div>
                    <span className="font-semibold">Language:</span>{' '}
                    <span className="text-muted-foreground">{movie.Language}</span>
                  </div>
                )}
                {movie.Country && movie.Country !== 'N/A' && (
                  <div>
                    <span className="font-semibold">Country:</span>{' '}
                    <span className="text-muted-foreground">{movie.Country}</span>
                  </div>
                )}
                {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                  <div>
                    <span className="font-semibold">Box Office:</span>{' '}
                    <span className="text-muted-foreground">{movie.BoxOffice}</span>
                  </div>
                )}
                {movie.Production && movie.Production !== 'N/A' && (
                  <div>
                    <span className="font-semibold">Production:</span>{' '}
                    <span className="text-muted-foreground">{movie.Production}</span>
                  </div>
                )}
                {isSeries && movie.totalSeasons && (
                  <div>
                    <span className="font-semibold">Seasons:</span>{' '}
                    <span className="text-muted-foreground">{movie.totalSeasons}</span>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cast">
            <div className="space-y-6">
              {actors.length > 0 && actors[0] !== 'N/A' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Cast</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {actors.map((actor) => (
                      <div
                        key={actor}
                        className="flex items-center gap-3 p-3 rounded-lg bg-card border"
                      >
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold flex-shrink-0">
                          {actor.charAt(0)}
                        </div>
                        <p className="text-sm font-medium truncate">{actor}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {directors.length > 0 && directors[0] !== 'N/A' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Directors</h3>
                  <div className="flex flex-wrap gap-3">
                    {directors.map((d) => (
                      <div key={d} className="px-4 py-2 rounded-lg bg-card border text-sm font-medium">
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {writers.length > 0 && writers[0] !== 'N/A' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Writers</h3>
                  <div className="flex flex-wrap gap-3">
                    {writers.map((w) => (
                      <div key={w} className="px-4 py-2 rounded-lg bg-card border text-sm font-medium">
                        {w}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="details">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-card border space-y-4">
                <h3 className="text-lg font-semibold">General Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IMDb ID</span>
                    <span className="font-mono">{movie.imdbID}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="capitalize">{movie.Type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year</span>
                    <span>{movie.Year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Released</span>
                    <span>{movie.Released}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Runtime</span>
                    <span>{movie.Runtime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span>{movie.Rated}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-card border space-y-4">
                <h3 className="text-lg font-semibold">Ratings</h3>
                <div className="space-y-3">
                  {movie.Ratings.map((r, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{r.Source}</span>
                      <span className="font-semibold">{r.Value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                <div className="p-6 rounded-lg bg-card border space-y-4">
                  <h3 className="text-lg font-semibold">Box Office</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Box Office</span>
                      <span className="font-semibold">{movie.BoxOffice}</span>
                    </div>
                  </div>
                </div>
              )}

              {movie.Production && movie.Production !== 'N/A' && (
                <div className="p-6 rounded-lg bg-card border space-y-4">
                  <h3 className="text-lg font-semibold">Production</h3>
                  <p className="text-sm text-muted-foreground">{movie.Production}</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="text-center py-12 text-muted-foreground">
              <p>User reviews coming soon. Sign up to be the first to review!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
