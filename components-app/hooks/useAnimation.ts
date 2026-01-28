import { useRef } from "react";
import { Animated } from "react-native";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

//Usando el Animated API
export const useAnimation = () => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedTop = useRef(new Animated.Value(-100)).current;

  const fadeIn = ({
    duration = 300,
    toValue = 1,
    useNativeDriver = true,
    easing = Easing.linear,
    callback = () => {},
  }) => {
    Animated.timing(animatedOpacity, {
      toValue,
      duration,
      useNativeDriver,
      easing: easing,
    }).start(callback);
  };

  const fadeOut = ({
    duration = 300,
    toValue = 1,
    useNativeDriver = true,
    easing = Easing.out(Easing.ease),
    callback = () => {},
  }) => {
    Animated.timing(animatedOpacity, {
      toValue,
      duration,
      useNativeDriver,
      easing,
    }).start(callback);
  };

  const startMovingTopPosition = ({
    initialPosition = -100,
    duration = 300,
    toValue = 0,
    useNativeDriver = true,
    easing = Easing.ease,
  }) => {
    animatedTop.setValue(initialPosition);
    Animated.timing(animatedTop, {
      toValue,
      duration,
      easing: easing,
      useNativeDriver,
    }).start();
  };

  return {
    fadeIn,
    fadeOut,
    startMovingTopPosition,
    animatedOpacity,
    animatedTop,
  };
};

export const useAnimationWithGestureHandler = () => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const fadeIn = ({
    toValue = 1,
    duration = 300,
    easing = Easing.linear,
  }: {
    toValue?: number;
    duration?: number;
    easing?: (value: number) => number;
  }) => {
    opacity.value = withTiming(toValue, { duration, easing });
  };
  const fadeOut = ({
    toValue = 0,
    duration = 300,
    easing = Easing.out(Easing.ease),
  }: {
    toValue?: number;
    duration?: number;
    easing?: (value: number) => number;
  }) => {
    opacity.value = withTiming(toValue, { duration, easing });
  };
  const moveY = ({
    from = -100,
    to = 0,
    duration = 300,
    easing = Easing.ease,
  }: {
    from?: number;
    to?: number;
    duration?: number;
    easing?: (value: number) => number;
  }) => {
    translateY.value = from;
    translateY.value = withTiming(to, { duration, easing });
  };
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));
  return { fadeIn, fadeOut, moveY, animatedStyle, opacity, translateY };
};
