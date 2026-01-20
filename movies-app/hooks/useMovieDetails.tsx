import { CompleteMovie } from "@/interfaces/movie.interface";
import { creditOfMovies } from "@/services/actions/movies/movie-cast";
import { movieDetails } from "@/services/actions/movies/movie-details";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
interface Props {
  queryKey: string | string[];
  id: number;
}

export const useMoviesDetails = ({ queryKey, id }: Props) => {
  const queryResults = useQuery<CompleteMovie>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: () => movieDetails({ id }),
    staleTime: 1000 * 60 * 60 * 24,
  });

  return {
    ...queryResults,
  };
};

export const useCreditMoviesDetails = ({ queryKey, id }: Props) => {
  const queryResults = useInfiniteQuery({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: ({ pageParam }) => {
      return creditOfMovies({ page: pageParam, id: id });
    },
    getNextPageParam: (_, allPages) => allPages.length + 1,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 24,
  });

  console.log(queryResults.data);

  return {
    ...queryResults,
  };
};
