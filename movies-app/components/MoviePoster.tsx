import { router } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import FadeInImage from "./images/FadeInImage";
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
      onPress={() => router.push(`/movies/${id}`)}
    >
      <FadeInImage
        style={{
          width: smallPoster ? 85 : 200,
          height: smallPoster ? 130 : 250,
          justifyContent: "flex-end",
          resizeMode: "stretch",
        }}
        className="shadow-lg rounded-2xl w-full h-full"
        uri={image}
      />
    </Pressable>
  );
};
