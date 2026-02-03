import movieSplash from "@/assets/lottie/movie.json";
import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";

interface Props {
  onFinish?: (isCancelled?: boolean) => void; // Define the onFinish prop here
}

const MovieSplashScreen = ({ onFinish = () => {} }: Props) => {
  return (
    <View className="bg-black flex-1 justify-center items-center">
      <LottieView
        source={movieSplash}
        autoPlay
        loop={false}
        onAnimationFinish={onFinish}
        resizeMode="center"
        style={{ width: "100%", height: 200 }}
      />
    </View>
  );
};

export default MovieSplashScreen;
