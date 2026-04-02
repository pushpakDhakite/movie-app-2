const OMDB_BASE = 'http://www.omdbapi.com';

const IMDB_KEYS = [
  '4b447405',
  'eb0c0475',
  '7776cbde',
  'ff28f90b',
  '6c3a2d45',
  'b07b58c8',
  'ad04b643',
  'a95b5205',
  '777d9323',
  '2c2c3314',
  'b5cff164',
  '89a9f57d',
  '73a9858a',
  'efbd8357',
];

let keyIndex = 0;

function getNextKey(): string {
  if (process.env.OMDB_API_KEY) return process.env.OMDB_API_KEY;
  const key = IMDB_KEYS[keyIndex % IMDB_KEYS.length];
  keyIndex++;
  return key;
}

export interface OmdbMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode';
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: 'True' | 'False';
  Error?: string;
  totalSeasons?: string;
  Episode?: string;
  Season?: string;
}

export interface OmdbSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode';
  Poster: string;
}

export interface OmdbSearchResponse {
  Search: OmdbSearchResult[];
  totalResults: string;
  Response: 'True' | 'False';
  Error?: string;
}

async function omdbFetch<T>(params: Record<string, string>): Promise<T> {
  const apiKey = getNextKey();
  const url = new URL(OMDB_BASE);
  url.searchParams.set('apikey', apiKey);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`OMDB API error: ${res.status}`);
  return res.json();
}

export const omdb = {
  getById: (id: string) =>
    omdbFetch<OmdbMovie>({ i: id, plot: 'full', tomatoes: 'true' }),

  getByTitle: (title: string, year?: string) =>
    omdbFetch<OmdbMovie>({ t: title, y: year || '', plot: 'full' }),

  search: (query: string, type?: 'movie' | 'series' | 'episode', page = 1) => {
    const params: Record<string, string> = { s: query, page: String(page) };
    if (type) params.type = type;
    return omdbFetch<OmdbSearchResponse>(params);
  },

  getImdbRating: (id: string) =>
    omdbFetch<OmdbMovie>({ i: id }).then((r) => ({
      imdbRating: r.imdbRating,
      imdbVotes: r.imdbVotes,
      ratings: r.Ratings,
    })),

  parseRuntime: (runtime: string): number | null => {
    const match = runtime.match(/(\d+)/);
    return match ? parseInt(match[1]) : null;
  },

  parseYear: (year: string): number | null => {
    const match = year.match(/(\d{4})/);
    return match ? parseInt(match[1]) : null;
  },

  parseGenres: (genre: string): string[] =>
    genre.split(',').map((g) => g.trim()),

  parseActors: (actors: string): string[] =>
    actors.split(',').map((a) => a.trim()),

  parseDirectors: (director: string): string[] =>
    director.split(',').map((d) => d.trim()),

  toTitleType: (type: string): string => {
    switch (type) {
      case 'movie': return 'MOVIE';
      case 'series': return 'TV_SERIES';
      case 'episode': return 'TV_EPISODE';
      default: return 'MOVIE';
    }
  },
};
