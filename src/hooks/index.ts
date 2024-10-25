// src/hooks/index.ts
import { GetPopularMovies, SearchMovies } from "@/services";
import { useQuery } from "@tanstack/react-query";

// Hook to get popular movies with pagination
export const useGetPopularMovies = (page: number) => {
  return useQuery({
    queryKey: ["POPULAR_MOVIES", page],
    queryFn: () => GetPopularMovies(page),
  });
};

// Hook to search movies with pagination
export const useSearchMovies = (query: string, page: number) => {
  return useQuery({
    queryKey: ["SEARCH_MOVIES", query, page],
    queryFn: () => SearchMovies(query, page),
    enabled: !!query, // Only run the query if the query string is truthy
  });
};
