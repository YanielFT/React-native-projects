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
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation, usePathname } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const deviceHeight = Dimensions.get("window").height;

export default function HomeScreen() {
  const pathname = usePathname();
  const safeArea = useSafeAreaInsets();
  const [pendingImage, setPendingImage] = useState("");
  const navigation = useNavigation();
  const onToggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer);
  };

  const { data, isLoading } = useMovies({
    queryFn: () => nowPlayingAction({ page: 2 }),
    queryKey: "movies",
  });

  const [currentImage, setCurrentImage] = useState<Movie["backdrop"]>("");

  const opacity = useRef(new Animated.Value(0)).current;

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

  const changeImage = (newImage: string) => {
    setPendingImage(newImage);
  };

  const toggleSearchModal = () => {
    if (pathname === "/movies/modal-search") {
      router.back();
    } else {
      router.push("/movies/modal-search");
    }
  };

  return (
    <>
      {/* Drawer action */}
      <Pressable
        onPress={onToggleDrawer}
        style={{ marginTop: safeArea.top }}
        className=" absolute z-50 items-center justify-center w-12 h-12 p-2  left-5 top-5 50 rounded-full bg-black "
      >
        <Ionicons size={20} color="white" name={"grid-outline"} />
      </Pressable>
      <View
        style={{ marginTop: safeArea.top }}
        className=" absolute items-center justify-center w-12 h-12 p-2  right-5 top-5 z-50 rounded-full bg-black "
      >
        <Ionicons
          size={20}
          className="z-50"
          color="white"
          onPress={toggleSearchModal}
          name={"search-outline"}
        />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: safeArea.top + 20 }}
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
            height: deviceHeight * 0.7,
          }}
          imageStyle={{ resizeMode: "cover", height: deviceHeight * 0.7 }}
        >
          {pendingImage ? (
            <Animated.Image
              source={{ uri: pendingImage }}
              style={{
                position: "absolute",
                width: "100%",
                height: deviceHeight * 0.7,
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

        <LinearGradient
          colors={["transparent", "black"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            height: deviceHeight * 0.7,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 10,
          }}
        />

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
