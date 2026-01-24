import ThemedButton from "@/components/shared/ThemedButton";
import ThemedView from "@/components/shared/ThemedView";
import { useAnimation } from "@/hooks/useAnimation";
import { Animated, Easing } from "react-native";

const Animation101Screen = () => {
  const {
    fadeOut,
    fadeIn,
    startMovingTopPosition,
    animatedOpacity,
    animatedTop,
  } = useAnimation();

  return (
    <ThemedView margin className="justify-center flex-1 items-center">
      <Animated.View
        style={{
          width: 150,
          height: 150,
          opacity: animatedOpacity,
          transform: [{ translateY: animatedTop }],
        }}
        className=" bg-light-secondary dark:bg-dark-secondary rounded-xl"
      />

      <ThemedButton
        className="my-5"
        onPress={() => {
          fadeIn({
            duration: 300,
            toValue: 1,
            useNativeDriver: true,
            easing: Easing.linear,
          });
          startMovingTopPosition({ duration: 700 });
        }}
      >
        FadeIn
      </ThemedButton>
      <ThemedButton
        className="mb-5"
        onPress={() => {
          fadeOut({
            duration: 700,
            toValue: 0,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          });
        }}
      >
        FadeOut
      </ThemedButton>
    </ThemedView>
  );
};
export default Animation101Screen;
