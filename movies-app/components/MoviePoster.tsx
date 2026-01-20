import { router } from "expo-router";
import React from "react";
import { Image, Pressable } from "react-native";
interface Props {
  id: number;
  image: string;
  smallPoster?: boolean;
  className?: string;
}
export const MoviePoster = ({
  id,
  image,
  className,
  smallPoster = false,
}: Props) => {
  return (
    <Pressable
      className={` ${className}  px-2 active:opacity-90 justify-center items-center`}
      onPress={() => router.push(`/movie/${id}`)}
    >
      <Image
        resizeMode="stretch"
        style={{
          width: smallPoster ? 85 : 200,
          height: smallPoster ? 130 : 250,
          justifyContent: "flex-end",
        }}
        className="shadow-lg rounded-2xl w-full h-full"
        source={{ uri: image }}
      />
    </Pressable>
  );
};
