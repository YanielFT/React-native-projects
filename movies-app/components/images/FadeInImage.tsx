import { useThemeColor } from "@/hooks/use-theme-color";
import { useAnimationWithGestureHandler } from "@/hooks/useAnimation";
import React, { useState } from "react";
import { ImageStyle, StyleProp, View } from "react-native";
import Animated from "react-native-reanimated";
import ShimmerSkeleton from "../shared/ShimmerSkeleton";

interface ListItemProps {
  uri: string;
  style: StyleProp<ImageStyle>;
  className?: string;
}

const FadeInImage = ({ uri, style, className }: ListItemProps) => {
  const color = useThemeColor({}, "primary");
  const [loading, setLoading] = useState(false);
  const { opacity, fadeIn } = useAnimationWithGestureHandler();
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {loading && (
        <ShimmerSkeleton className={`${className}`} style={[style]} />
      )}
      <Animated.Image
        className={className}
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
    </View>
  );
};

export default FadeInImage;
