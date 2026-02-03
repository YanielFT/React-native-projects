import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface Props {
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const ShimmerSkeleton = ({ className, style }: Props) => {
  // const translateX = useSharedValue(-100);

  // useEffect(() => {
  //   translateX.value = withRepeat(
  //     withTiming(300, { duration: 1200 }),
  //     -1,
  //     false,
  //   );
  // }, []);

  // const animatedStyle = useAnimatedStyle(() => ({
  //   transform: [{ translateX: translateX.value }],
  // }));

  return (
    <View
      className={`${className} bg-gray-500/35 relative flex justify-center items-center`}
      style={[style, { position: "absolute", top: 0, left: 0 }]}
    >
      <View className="absolute inset-0 justify-center items-center">
        <Ionicons name="film-outline" size={80} color="gray" />
      </View>
      {/* <Animated.View
        style={[
          { position: "absolute", width: 80, height: "100%" },
          animatedStyle,
        ]}
      >
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View> */}
    </View>
  );
};

export default ShimmerSkeleton;
