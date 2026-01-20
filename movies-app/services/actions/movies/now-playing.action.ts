import { MovieMapper } from "@/interfaces/mappers/movie.mapper";
import {
  NowPlayingResponse,
  PopularResponse,
} from "@/interfaces/moviedb-movies";
import { movieApi } from "@/services/api/movie-api";

export interface Options {
  page?: number;
  limit?: number;
}

export const nowPlayingAction = async ({ page = 1, limit = 10 }: Options) => {
  try {
    const { data } = await movieApi.get<NowPlayingResponse>("/now_playing", {
      params: {
        page: page,
      },
    });
    const dataFormatted = data.results.map(MovieMapper.fromMovieDBToMovie);
    return dataFormatted;
  } catch (error) {
    console.log(error);
    throw "Cannot load now playing movies";
  }
};

export const popularAction = async ({ page = 1, limit = 10 }: Options) => {
  try {
    const { data } = await movieApi.get<PopularResponse>("/popular", {
      params: {
        page: page,
      },
    });
    const dataFormatted = data.results.map(MovieMapper.fromMovieDBToMovie);
    return dataFormatted;
  } catch (error) {
    console.log(error);
    throw "Cannot load now popular movies";
  }
};

export const topRatedAction = async () => {
  try {
    const { data } = await movieApi.get<PopularResponse>("/top_rated");
    const dataFormatted = data.results.map(MovieMapper.fromMovieDBToMovie);
    return dataFormatted;
  } catch (error) {
    console.log(error);
    throw "Cannot load now top rated movies";
  }
};

export const upComingAction = async () => {
  try {
    const { data } = await movieApi.get<PopularResponse>("/upcoming");
    const dataFormatted = data.results.map(MovieMapper.fromMovieDBToMovie);
    return dataFormatted;
  } catch (error) {
    console.log(error);
    throw "Cannot load now up coming movies";
  }
};
