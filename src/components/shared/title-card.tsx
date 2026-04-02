'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { useWatchlistStore } from '@/stores/watchlist';
import { cn, getRatingColor } from '@/utils/format';

interface TitleCardProps {
  id: string;
  title: string;
  posterUrl: string | null;
  rating?: number;
  year?: string;
  type?: string;
}

export function TitleCard({
  id,
  title,
  posterUrl,
  rating,
  year,
  type,
}: TitleCardProps) {
  const isInWatchlist = useWatchlistStore((s) => s.isInWatchlist(id));
  const toggleItem = useWatchlistStore((s) => s.toggleItem);
  const yearNum = year ? parseInt(year) : null;

  const handleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem({ Title: title, Year: year || '', imdbID: id, Type: type || 'movie', Poster: posterUrl || '' });
  };

  return (
    <div className="group relative">
      <Link href={`/titles/${id}`} className="block">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted">
          {posterUrl && posterUrl !== 'N/A' ? (
            <Image
              src={posterUrl}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      <button
        onClick={handleWatchlist}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
        aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
      >
        {isInWatchlist ? (
          <BookmarkCheck className="h-4 w-4 text-gold" />
        ) : (
          <BookmarkPlus className="h-4 w-4 text-white" />
        )}
      </button>

      {rating && rating > 0 && (
        <div className={cn('absolute bottom-16 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/70 text-xs font-semibold', getRatingColor(rating))}>
          <Star className="h-3 w-3 fill-current" />
          {rating.toFixed(1)}
        </div>
      )}

      <div className="mt-2">
        <Link href={`/titles/${id}`} className="text-sm font-medium line-clamp-1 hover:text-gold transition-colors">
          {title}
        </Link>
        {yearNum && <p className="text-xs text-muted-foreground">{yearNum}</p>}
        {type && (
          <span className="inline-block mt-1 px-2 py-0.5 bg-accent rounded text-xs capitalize text-muted-foreground">
            {type}
          </span>
        )}
      </div>
    </div>
  );
}
