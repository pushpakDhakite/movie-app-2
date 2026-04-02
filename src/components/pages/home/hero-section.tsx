import Image from 'next/image';
import Link from 'next/link';
import { Play, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { omdb, type OmdbMovie } from '@/api/omdb';

interface HeroSectionProps {
  movie: OmdbMovie | null;
}

export function HeroSection({ movie }: HeroSectionProps) {
  if (!movie || movie.Response === 'False') return null;

  const year = omdb.parseYear(movie.Year);
  const rating = parseFloat(movie.imdbRating) || 0;
  const backdropUrl = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : null;

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
      {backdropUrl && (
        <Image
          src={backdropUrl}
          alt={movie.Title}
          fill
          className="object-cover blur-sm scale-110"
          priority
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />

      <div className="relative container h-full flex items-end pb-16">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            {movie.Title} {year && <span className="text-muted-foreground">({year})</span>}
          </h1>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-gold fill-gold" />
              <span className="font-semibold">{rating.toFixed(1)}</span>
            </div>
            {movie.Runtime && movie.Runtime !== 'N/A' && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{movie.Runtime}</span>
              </div>
            )}
            <span className="px-2 py-0.5 bg-gold/20 text-gold rounded text-xs font-medium uppercase">
              {movie.Type === 'series' ? 'TV Series' : 'Movie'}
            </span>
          </div>

          <p className="text-muted-foreground line-clamp-3">{movie.Plot}</p>

          <div className="flex items-center gap-3 pt-2">
            <Button size="lg" asChild>
              <Link href={`/titles/${movie.imdbID}`}>View Details</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Play className="h-4 w-4 mr-2" />
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
