import ThemedButton from "@/components/shared/ThemedButton";
import ThemedCard from "@/components/shared/ThemedCard";
import ThemedText from "@/components/shared/ThemedText";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Dimensions, Platform } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function Modal() {
  const translateY = useSharedValue(0);
  const screenHeight = Dimensions.get("window").height;

  const closeModal = () => {
    router.back();
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (event.translationY > 50) {
        // animar hacia abajo
        translateY.value = withTiming(screenHeight, { duration: 300 }, () => {
          runOnJS(closeModal)();
        });
      } else {
        // volver al centro si no pasó el umbral
        translateY.value = withTiming(0, { duration: 200 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={animatedStyle}
        className="bg-black/35 justify-center items-center flex-1"
      >
        <ThemedCard>
          <ThemedText type="h2">Hola, soy un modal</ThemedText>
        </ThemedCard>

        <ThemedButton
          className="m-4"
          onPress={() => router.push("/modal/modal-example-2")}
        >
          Otra Modal
        </ThemedButton>

        <ThemedButton className="m-4" onPress={() => router.dismiss()}>
          Cerrar
        </ThemedButton>

        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </Animated.View>
    </GestureDetector>
  );
}
