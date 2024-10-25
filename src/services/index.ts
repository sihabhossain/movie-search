"use server";

// src/services/movieService.ts
import axiosInstance from "@/lib/AxiosInstance";

// Fetch popular movies with pagination
export const GetPopularMovies = async (page: number) => {
  try {
    const { data } = await axiosInstance.get(
      `/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`
    );

    return data; // Return the entire data object including total_pages
  } catch (error: any) {
    throw new Error(error);
  }
};

// Search movies with pagination
export const SearchMovies = async (query: string, page: number) => {
  if (!query) {
    return { results: [], total_pages: 0 }; // Return an object with results and total_pages
  }
  try {
    const { data } = await axiosInstance.get(
      `/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}&page=${page}`
    );

    return data; // Return the entire data object including total_pages
  } catch (error: any) {
    throw new Error(error);
  }
};
