import { omdb } from '@/api/omdb';
import { HeroSection } from '@/components/pages/home/hero-section';
import { SearchResultsSection } from '@/components/pages/home/search-results-section';
import { GenreBrowse } from '@/components/pages/home/genre-browse';

const POPULAR_SEARCHES = [
  'Avengers', 'Batman', 'Spider', 'Star Wars', 'Harry Potter',
  'Lord of the Rings', 'Marvel', 'Inception', 'Interstellar', 'Joker',
];

const GENRES = [
  { name: 'Action', query: 'action' },
  { name: 'Comedy', query: 'comedy' },
  { name: 'Drama', query: 'drama' },
  { name: 'Horror', query: 'horror' },
  { name: 'Sci-Fi', query: 'science fiction' },
  { name: 'Romance', query: 'romance' },
  { name: 'Thriller', query: 'thriller' },
  { name: 'Fantasy', query: 'fantasy' },
  { name: 'Animation', query: 'animation' },
  { name: 'Documentary', query: 'documentary' },
];

export default async function HomePage() {
  const [hero, popular, topRated, newReleases] = await Promise.all([
    omdb.getById('tt4154796').catch(() => null),
    omdb.search('marvel', 'movie', 1).catch(() => ({ Search: [], Response: 'False' })),
    omdb.search('oscar winner', 'movie', 1).catch(() => ({ Search: [], Response: 'False' })),
    omdb.search('2024', 'movie', 1).catch(() => ({ Search: [], Response: 'False' })),
  ]);

  return (
    <div className="space-y-12">
      <HeroSection movie={hero} />
      <SearchResultsSection
        title="Popular Movies"
        items={popular.Response === 'True' ? popular.Search : []}
      />
      <SearchResultsSection
        title="Top Rated"
        items={topRated.Response === 'True' ? topRated.Search : []}
      />
      <SearchResultsSection
        title="Recent Releases"
        items={newReleases.Response === 'True' ? newReleases.Search : []}
      />
      <GenreBrowse genres={GENRES} />
    </div>
  );
}
