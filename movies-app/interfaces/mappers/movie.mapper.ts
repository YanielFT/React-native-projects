import { Cast, CompleteMovie, Movie } from "../movie.interface";
import { CastResponse } from "../moviedb-credit";
import { MovieDetails } from "../moviedb-details";
import { Result } from "../moviedb-movies";

export class MovieMapper {
  static fromMovieDBToMovie = (movie: Result): Movie => {
    return {
      id: movie.id,
      description: movie.overview,
      title: movie.title,
      releaseDate: new Date(movie.release_date),
      rating: movie.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
    };
  };
  static fromMovieDBToCompleteMovie = (movie: MovieDetails): CompleteMovie => {
    return {
      id: movie.id,
      budget: movie.budget,
      duration: movie.runtime,
      originalTitle: movie.original_title, // Original title in the original language
      ProductionCompanies: movie.production_companies?.map(
        (company) => company.name,
      ),
      genres: movie.genres?.map((genre) => genre.name),
      description: movie.overview,
      title: movie.title,
      releaseDate: new Date(movie.release_date),
      rating: movie.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
    };
  };
  static fromMovieDBToCredits = (movie: CastResponse): Cast => {
    return {
      id: movie.id,
      name: movie.name,
      character: movie.character ?? "No character",
      avatar: movie.profile_path
        ? `https://image.tmdb.org/t/p/w500${movie.profile_path}`
        : "https://i.stack.imgur.com/l60Hf.png", // esto en caso de no tener imagen
    };
  };
}
