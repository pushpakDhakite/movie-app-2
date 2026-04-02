'use client';

import Link from 'next/link';
import Image from 'next/image';

interface SearchResultsSectionProps {
  title: string;
  items: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }[];
}

export function SearchResultsSection({ title, items }: SearchResultsSectionProps) {
  if (!items.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.slice(0, 12).map((item) => (
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
    </section>
  );
}
