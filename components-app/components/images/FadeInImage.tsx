import { useThemeColor } from "@/hooks/use-theme-color";
import {
  useAnimationWithGestureHandler
} from "@/hooks/useAnimation";
import React, { useState } from "react";
import { ActivityIndicator, ImageStyle, StyleProp } from "react-native";
import Animated from "react-native-reanimated";
import ThemedView from "../shared/ThemedView";

interface ListItemProps {
  uri: string;
  style: StyleProp<ImageStyle>;
}

const FadeInImage = ({ uri, style }: ListItemProps) => {
  const color = useThemeColor({}, "primary");
  const [loading, setLoading] = useState(false);
  const { opacity, fadeIn } = useAnimationWithGestureHandler();
  return (
    <ThemedView
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading && (
        <ActivityIndicator className="absolute" size="large" color={color} />
      )}
      <Animated.Image
        source={{ uri }}
        style={[style, { opacity: opacity }]}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoadEnd={() => {
          setLoading(false);
          fadeIn({ duration: 300 });
        }}
      />
    </ThemedView>
  );
};

export default FadeInImage;
