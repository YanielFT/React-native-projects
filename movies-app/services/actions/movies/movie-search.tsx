import { MovieMapper } from "@/interfaces/mappers/movie.mapper";
import { MovieSearched } from "@/interfaces/movie.interface";
import { SearchMovieResponse } from "@/interfaces/search-movie";
import { movieApi } from "@/services/api/movie-api";

interface Props {
  title: string;
}

export const movieShearched = async ({
  title,
}: Props): Promise<MovieSearched[]> => {
  try {
    const { data } = await movieApi.get<SearchMovieResponse>(`/search/movie`, {
      params: {
        query: title,
      },
    });

    return data.results.map(MovieMapper.fromMovieDBToMovieSearched);
  } catch (error) {
    console.log(error);
    throw "Cannot load now playing movies";
  }
};
