import { Movie } from "@/interfaces/movie.interface";
import { Options } from "@/services/actions/movies/now-playing.action";
import { useInfiniteQuery } from "@tanstack/react-query";
interface Props {
  queryFn: (params: Options) => Promise<Movie[]>;
  queryKey: string;
}

export const useMovies = ({ queryFn, queryKey }: Props) => {
  const queryResults = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [queryKey],
    queryFn: ({ pageParam }) => {
      return queryFn({ page: pageParam });
    },
    getNextPageParam: (_, allPages) => allPages.length + 1,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return {
    ...queryResults,
  };
};
