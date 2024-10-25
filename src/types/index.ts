export interface TMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}

export interface TMoviesResponse {
  page: number;
  results: TMovie[];
  total_pages: number;
  total_results: number;
}

export type MovieCardProps = {
  movie: TMovie;
};

// Define the API response structure
export interface MovieResponse {
  page: number;
  results: TMovie[];
  total_pages: number;
  total_results: number;
}
