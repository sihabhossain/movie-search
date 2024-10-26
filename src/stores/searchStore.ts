import { create } from "zustand";

type SearchStoreType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const useSearchStore = create<SearchStoreType>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
