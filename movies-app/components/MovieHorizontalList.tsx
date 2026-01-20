import { Movie } from "@/interfaces/movie.interface";
import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { MoviePoster } from "./MoviePoster";

type Props = {
  movies: Movie[];
  title?: string;
  backgroundColor?: boolean;
  textColor?: string;
  loadNextPage?: () => void;
  className?: string;
};

const deviceWidth = Dimensions.get("window").width;

const MovieHorizontalList = ({
  textColor = "black",
  backgroundColor = false,
  movies,
  className,
  title,
  loadNextPage,
}: Props) => {
  const isLoading = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false;
    }, 200);
  }, [movies]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) return;

    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isEndReached =
      contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;
    if (!isEndReached) return;

    isLoading.current = true;
    console.log("Loading Next page!");

    loadNextPage?.();
  };

  return (
    <ImageBackground
      source={{
        uri: backgroundColor
          ? "https://image.tmdb.org/t/p/w500/7OOQRx9SmkMC3UQfdzj4QsQHtA1.jpg"
          : undefined,
      }}
      style={{ flex: 1 }}
      className={`z-20 ${className}`}
      imageStyle={{ resizeMode: "cover", paddingBlock: 80 }}
    >
      <Text
        className="font-acme-regular text-2xl ml-3 mt-10"
        style={{ color: textColor }}
      >
        {title}
      </Text>
      <View style={{ width: deviceWidth, height: 180 }}>
        <FlatList
          onScroll={onScroll}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={movies}
          keyExtractor={(item, i) => `${item.id}-${i}`}
          renderItem={({ item }) => (
            <MoviePoster smallPoster id={item.id} image={item.poster} />
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default MovieHorizontalList;
