'use client';

import { useWatchlistStore } from '@/stores/watchlist';
import { TitleCard } from '@/components/shared/title-card';
import { Button } from '@/components/ui/button';
import { Bookmark, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function WatchlistPage() {
  const { items, removeItem } = useWatchlistStore();
  const movies = items.filter((i) => i.Type === 'movie');
  const tvShows = items.filter((i) => i.Type === 'series');

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center gap-3">
        <Bookmark className="h-6 w-6 text-gold" />
        <h1 className="text-2xl font-bold">My Watchlist</h1>
        <span className="text-sm text-muted-foreground">({items.length})</span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground">Your watchlist is empty</p>
          <p className="text-sm text-muted-foreground mt-2">Browse movies and TV shows to add to your watchlist</p>
          <Button className="mt-4" onClick={() => window.location.href = '/movies'}>Browse Movies</Button>
        </div>
      ) : (
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All ({items.length})</TabsTrigger>
            <TabsTrigger value="movies">Movies ({movies.length})</TabsTrigger>
            <TabsTrigger value="tv">TV Shows ({tvShows.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {items.map((item) => (
                <div key={item.imdbID} className="relative group">
                  <TitleCard
                    id={item.imdbID}
                    title={item.Title}
                    posterUrl={item.Poster}
                    year={item.Year}
                    type={item.Type}
                  />
                  <button
                    onClick={() => removeItem(item.imdbID)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600/80 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Remove from watchlist"
                  >
                    <Trash2 className="h-3 w-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="movies">
            {movies.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No movies in your watchlist</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {movies.map((item) => (
                  <div key={item.imdbID} className="relative group">
                    <TitleCard
                      id={item.imdbID}
                      title={item.Title}
                      posterUrl={item.Poster}
                      year={item.Year}
                      type={item.Type}
                    />
                    <button
                      onClick={() => removeItem(item.imdbID)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600/80 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Remove from watchlist"
                    >
                      <Trash2 className="h-3 w-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="tv">
            {tvShows.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No TV shows in your watchlist</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {tvShows.map((item) => (
                  <div key={item.imdbID} className="relative group">
                    <TitleCard
                      id={item.imdbID}
                      title={item.Title}
                      posterUrl={item.Poster}
                      year={item.Year}
                      type={item.Type}
                    />
                    <button
                      onClick={() => removeItem(item.imdbID)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600/80 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Remove from watchlist"
                    >
                      <Trash2 className="h-3 w-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
