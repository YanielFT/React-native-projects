import MovieSplashScreen from "@/components/shared/MovieSplashScreen";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { useState } from "react";
import { useColorScheme } from "react-native";
import "./global.css";
const queryClient = new QueryClient();
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isAppUpdated, setIsAppUpdated] = useState(false);
  const [fontsLoaded, error] = useFonts({
    "Acme-Regular": require("../assets/fonts/Acme-Regular.ttf"),
  });

  if (!fontsLoaded || !isAppUpdated) {
    return (
      <MovieSplashScreen
        onFinish={(isCancelled) => !isCancelled && setIsAppUpdated(true)}
      />
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Slot />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
