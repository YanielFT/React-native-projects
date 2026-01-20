import MainSlideshow from "@/components/MainSlideshow";
import MovieHorizontalList from "@/components/MovieHorizontalList";
import { useMovies } from "@/hooks/useMovie";
import { Movie } from "@/interfaces/movie.interface";
import {
  nowPlayingAction,
  popularAction,
  topRatedAction,
  upComingAction,
} from "@/services/actions/movies/now-playing.action";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const deviceHeight = Dimensions.get("window").height;

export default function HomeScreen() {
  const safeArea = useSafeAreaInsets();
  const [pendingImage, setPendingImage] = useState("");
  const { data, isLoading } = useMovies({
    queryFn: () => nowPlayingAction({ page: 2 }),
    queryKey: "movies",
  });

  const [currentImage, setCurrentImage] = useState<Movie["backdrop"]>("");

  const opacity = useRef(new Animated.Value(1)).current;

  const {
    fetchNextPage: fetchPopularNextPage,
    data: pupularData,
    isLoading: isPopularLoading,
  } = useMovies({
    queryFn: popularAction,
    queryKey: "popular",
  });

  const {
    fetchNextPage: fetchTopRatedNextPage,
    data: topRatedData,
    isLoading: isTopRatedLoading,
  } = useMovies({
    queryFn: topRatedAction,
    queryKey: "top-rated",
  });

  const {
    fetchNextPage: fetchUpComingNextPage,
    data: upComingData,
    isLoading: isUpComingLoading,
  } = useMovies({
    queryFn: upComingAction,
    queryKey: "upComing",
  });

  if (
    isLoading &&
    data &&
    isPopularLoading &&
    pupularData &&
    isTopRatedLoading &&
    topRatedData &&
    pupularData &&
    isUpComingLoading &&
    upComingData
  ) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <ActivityIndicator
          size="large"
          color="purple"
          animating={true}
          hidesWhenStopped={true}
        />
      </View>
    );
  }

  const changeImage = (newImage: string) => {
    setPendingImage(newImage);
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: safeArea.top }}
        showsVerticalScrollIndicator={false}
        className="bg-black relative"
      >
        <ImageBackground
          source={{ uri: currentImage || pendingImage }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: deviceHeight * 0.6,
          }}
          imageStyle={{ resizeMode: "cover", height: deviceHeight * 0.6 }}
        >
          {pendingImage ? (
            <Animated.Image
              source={{ uri: pendingImage }}
              style={{
                position: "absolute",
                width: "100%",
                height: deviceHeight * 0.6,
                opacity,
              }}
              onLoadEnd={() => {
                Animated.timing(opacity, {
                  toValue: 1,
                  duration: 800,
                  useNativeDriver: true,
                }).start(() => {
                  setCurrentImage(pendingImage);
                });
              }}
            />
          ) : null}
        </ImageBackground>
        <View
          style={{
            height: deviceHeight * 0.65,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        />
        <Text className="text-2xl z-20 font-acme-regular text-white px-4 mb-2 text-center">
          Movies
        </Text>
        {/* Carousel de imágenes */}
        <MainSlideshow
          movies={data?.pages.flat() ?? []}
          setBackdropSelected={changeImage}
        />
        <MovieHorizontalList
          movies={pupularData?.pages.flat() ?? []}
          loadNextPage={fetchPopularNextPage}
        />

        <MovieHorizontalList
          textColor="white"
          loadNextPage={fetchTopRatedNextPage}
          movies={topRatedData?.pages.flat() ?? []}
          title="Top Rated Movies"
        />
        <MovieHorizontalList
          loadNextPage={fetchUpComingNextPage}
          textColor="white"
          movies={upComingData?.pages.flat() ?? []}
          title="Up Coming Movies"
          className={"mb-10"}
        />
      </ScrollView>
    </>
  );
}
