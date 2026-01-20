import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";
const queryClient = new QueryClient();
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Acme-Regular": require("../assets/fonts/Acme-Regular.ttf"),
  });
  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <Slot />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
