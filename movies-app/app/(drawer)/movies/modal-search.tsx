import MovieVerticalList from "@/components/MovieVerticalList";
import ThemedText from "@/components/shared/ThemedText";
import { useMoviesSearched } from "@/hooks/useMovieDetails";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  TextInput,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function Modal() {
  const [searchText, setSearchText] = useState("");
  const translateY = useSharedValue(0);
  const screenHeight = Dimensions.get("window").height;

  const { data, isLoading } = useMoviesSearched({
    title: searchText,
    queryKeys: ["popular", "search", searchText],
  });

  const closeModal = () => {
    router.back();
  };

  const closeModalWithAnimation = () => {
    translateY.value = withTiming(
      screenHeight,
      { duration: 300 },
      (finished) => {
        if (finished) {
          runOnJS(closeModal)();
        }
      },
    );
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value = Math.max(0, event.translationY);
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

  console.log(data);

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          {
            marginTop: screenHeight * 0.3,
          },
          animatedStyle,
        ]}
        className="bg-black/80  justify-start relative items-center flex-1"
      >
        <Ionicons
          size={20}
          className="z-50 absolute right-5 top-5"
          color="white"
          onPress={closeModalWithAnimation}
          name={"close-outline"}
        />

        <View className="w-full p-8 mt-5">
          <View className="flex-row items-center bg-white dark:bg-black rounded-md px-2">
            <TextInput
              className="flex-1 py-4 px-2 text-2xl text-black dark:text-white"
              placeholder="Movie..."
              placeholderTextColor="gray"
              onChangeText={(text) => setSearchText(text)}
            />
            <Ionicons name="search" size={24} color="gray" />
          </View>
        </View>

        <View className="relative flex-1 w-full justify-center items-center">
          {(!data || data?.length === 0) && !isLoading && (
            <View className="justify-center absolute flex-1 items-center">
              <ThemedText
                type="h2"
                className="text-white bg-black p-4 rounded-lg"
              >
                No movies found
              </ThemedText>
            </View>
          )}

          {isLoading && (
            <View className="justify-center absolute flex-1 items-center">
              <ActivityIndicator size={40} className="color-light-primary" />
            </View>
          )}

          {!isLoading && data && <MovieVerticalList movies={data} />}

          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
      </Animated.View>
    </GestureDetector>
  );
}
