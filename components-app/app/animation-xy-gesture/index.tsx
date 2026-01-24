import ThemedView from "@/components/shared/ThemedView";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function Animation102ScreenWithGesture() {
  // valores compartidos para X e Y
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const squareIsPressed = useSharedValue<boolean>(false);

  // definir el gesto Pan
  const panGesture = Gesture.Pan()
    .onStart(() => {
      squareIsPressed.set(true);
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      // al soltar, vuelve al centro con spring
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      squareIsPressed.set(false);
    });

  // estilo animado
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    backgroundColor: squareIsPressed.value ? "#FFE04B" : "#b58df1",
  }));

  //Otra animacion
  const pressed = useSharedValue<boolean>(false);

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: pressed.value ? "#FFE04B" : "#B58DF1",
    transform: [{ scale: withTiming(pressed.value ? 1.2 : 1) }],
  }));

  return (
    <ThemedView margin className="flex-1 items-center justify-center">
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </GestureDetector>
      <View className={"my-5"} />
      <GestureDetector gesture={tap}>
        <Animated.View style={[styles.circle, animatedStyles]} />
      </GestureDetector>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 80,
    height: 80,
    backgroundColor: "#61dafb",
    borderRadius: 4,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  circle: {
    height: 120,
    width: 120,
    borderRadius: 500,
  },
});
