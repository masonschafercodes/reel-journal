interface ITVSearchResponse {
  page: number;
  results: ITVShowSearchResult[];
  total_pages: number;
  total_results: number;
}

interface ITVShowSearchResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

interface ITVShowDetailsResponse {
  _id: string;
  air_date: string;
  episodes: ITVShowEpisode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface ITVShowEpisode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: ITVShowCrew[];
}

interface ITVShowCrew {
  department: string;
  job: string;
  credit_id: string;
  adult: boolean;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}
