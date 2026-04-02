import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WatchlistItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  addedAt: string;
}

interface WatchlistState {
  items: WatchlistItem[];
  addItem: (item: WatchlistItem) => void;
  removeItem: (imdbID: string) => void;
  isInWatchlist: (imdbID: string) => boolean;
  toggleItem: (item: WatchlistItem) => void;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          if (state.items.find((i) => i.imdbID === item.imdbID)) return state;
          return { items: [...state.items, { ...item, addedAt: new Date().toISOString() }] };
        }),
      removeItem: (imdbID) =>
        set((state) => ({
          items: state.items.filter((i) => i.imdbID !== imdbID),
        })),
      isInWatchlist: (imdbID) => get().items.some((i) => i.imdbID === imdbID),
      toggleItem: (item) =>
        set((state) => {
          const exists = state.items.find((i) => i.imdbID === item.imdbID);
          if (exists) {
            return { items: state.items.filter((i) => i.imdbID !== item.imdbID) };
          }
          return { items: [...state.items, { ...item, addedAt: new Date().toISOString() }] };
        }),
    }),
    { name: 'movieadda-watchlist' }
  )
);
