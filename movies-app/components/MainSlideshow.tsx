import { Movie } from "@/interfaces/movie.interface";
import * as React from "react";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { MoviePoster } from "./MoviePoster";

interface Props {
  movies: Movie[];
  setBackdropSelected: (_: string) => void;
}
const deviceWidth = Dimensions.get("window").width;

function MainSlideshow({ movies, setBackdropSelected }: Props) {
  return (
    <View className="translate-y-8 z-20">
      <Carousel
        loop
        snapEnabled
        pagingEnabled
        width={200}
        autoPlayInterval={5000}
        scrollAnimationDuration={600}
        autoPlay
        data={movies}
        style={{
          width: deviceWidth,
          height: 250,
          justifyContent: "center",
          alignItems: "center",
        }}
        defaultIndex={1}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onScrollStart={() => {}}
        renderItem={({ item }) => (
          <MoviePoster id={item.id} image={item.poster} />
        )}
        onSnapToItem={(index) => setBackdropSelected(movies[index]?.backdrop)}
      />
    </View>
  );
}

export default MainSlideshow;
