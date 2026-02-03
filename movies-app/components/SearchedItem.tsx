import ThemedText from "@/components/shared/ThemedText";
import { useAnimationWithGestureHandler } from "@/hooks/useAnimation";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import Animated from "react-native-reanimated";
import ShimmerSkeleton from "./shared/ShimmerSkeleton";

interface Props {
  id: number;
  title: string;
  release_date?: Date;
  image?: string;
}
const deviceWidth = Dimensions.get("window").width;

const SearchedItem = ({ id, image, release_date, title }: Props) => {
  const [loading, setLoading] = useState(false);
  const { opacity, fadeIn } = useAnimationWithGestureHandler();
  return (
    <Pressable
      onPress={() => router.push(`/movies/${id}`)}
      className="active:opacity-60 h-28 w-full rounded-lg flex-row  mb-4 "
    >
      {loading && (
        <ShimmerSkeleton className="relative rounded-2xl w-24 h-full" />
      )}
      <Animated.Image
        resizeMode="cover"
        source={{ uri: image }}
        className="shadow-lg rounded-2xl w-24 h-full"
        style={{ opacity: opacity }}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoadEnd={() => {
          setLoading(false);
          fadeIn({ duration: 300 });
        }}
      />
      <View className="p-3 flex-1">
        <ThemedText type="h2" adjustsFontSizeToFit numberOfLines={2}>
          {title}
        </ThemedText>
        <ThemedText type="normal">
          {release_date
            ? `${release_date.getDate()}/${release_date.getMonth() + 1}/${release_date.getFullYear()}`
            : "Sin fecha"}
        </ThemedText>
      </View>
    </Pressable>
  );
};

export default SearchedItem;
