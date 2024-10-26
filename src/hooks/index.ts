import {
  TMovieCastsSchema,
  TMovieDetailsSchema,
  TMovieRecommendationsSchema,
  TMoviesResponseSchema,
} from "@/schemas/movieSchema";
import {
  GetMovieCasts,
  GetMovieDetails,
  GetMovieRecommendations,
  GetPopularMovies,
  SearchMovies,
} from "@/services";
import { useQuery } from "@tanstack/react-query";

// Hook to get popular movies with pagination
export const useGetPopularMovies = (page: number) => {
  return useQuery({
    queryKey: ["POPULAR_MOVIES", page],
    queryFn: async () => {
      const data = await GetPopularMovies(page);
      return TMoviesResponseSchema.parse(data); // Validate data
    },
  });
};

// Hook to search movies with pagination
export const useSearchMovies = (query: string, page: number) => {
  return useQuery({
    queryKey: ["SEARCH_MOVIES", query, page],
    queryFn: async () => {
      const data = await SearchMovies(query, page);
      return TMoviesResponseSchema.parse(data); // Validate data
    },
    enabled: !!query,
  });
};

// Hook to get movie details
export const useGetMovieDetails = (movieId: string) => {
  return useQuery({
    queryKey: ["GET_DETAILS", movieId],
    queryFn: async () => {
      const data = await GetMovieDetails(movieId);
      return TMovieDetailsSchema.parse(data); // Validate data
    },
  });
};

// Hook to get movie casts
export const useGetMovieCasts = (movieId: string) => {
  return useQuery({
    queryKey: ["GET_CASTS", movieId],
    queryFn: async () => {
      const data = await GetMovieCasts(movieId);
      return TMovieCastsSchema.parse(data); // Validate data
    },
  });
};

// Hook to get movie recommendations
export const useGetMovieRecommendations = (movieId: string) => {
  return useQuery({
    queryKey: ["GET_RECOMMENDATIONS", movieId],
    queryFn: async () => {
      const data = await GetMovieRecommendations(movieId);
      return TMovieRecommendationsSchema.parse(data); // Validate data
    },
  });
};
