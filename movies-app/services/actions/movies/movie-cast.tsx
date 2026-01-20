import { MovieMapper } from "@/interfaces/mappers/movie.mapper";
import { Cast } from "@/interfaces/movie.interface";
import { CreditResponse } from "@/interfaces/moviedb-credit";
import { movieApi } from "@/services/api/movie-api";
import { Options } from "./now-playing.action";

interface Props extends Options {
  id: number;
}

export const creditOfMovies = async ({ id, page }: Props): Promise<Cast[]> => {
  try {
    const { data } = await movieApi.get<CreditResponse>(`/${id}/credits`, {
      params: { page },
    });

    console.log(data);

    return data.cast.map(MovieMapper.fromMovieDBToCredits);
  } catch (error) {
    console.log(error);
    throw "Cannot load now playing movies";
  }
};
