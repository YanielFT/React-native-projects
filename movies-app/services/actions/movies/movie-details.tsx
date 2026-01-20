import { MovieMapper } from "@/interfaces/mappers/movie.mapper";
import { CompleteMovie } from "@/interfaces/movie.interface";
import { MovieDetails } from "@/interfaces/moviedb-details";
import { movieApi } from "@/services/api/movie-api";

interface Props {
  id: number;
}

export const movieDetails = async ({ id }: Props): Promise<CompleteMovie> => {
  try {
    const { data } = await movieApi.get<MovieDetails>(`/${id}`);

    return MovieMapper.fromMovieDBToCompleteMovie(data);
  } catch (error) {
    console.log(error);
    throw "Cannot load now playing movies";
  }
};
