"use server";

import axiosInstance from "@/lib/AxiosInstance";

export const GetPopularMovies = async (page: number) => {
  try {
    const { data } = await axiosInstance.get(
      `/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const SearchMovies = async (query: string, page: number) => {
  if (!query) {
    return { results: [], total_pages: 0 };
  }
  try {
    const { data } = await axiosInstance.get(
      `/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}&page=${page}`
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const GetMovieDetails = async (movieId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const GetMovieCasts = async (movieId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/movie/${movieId}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );

    return data; // This should include `cast` property
  } catch (error: any) {
    throw new Error(error);
  }
};
