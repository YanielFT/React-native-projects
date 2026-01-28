import { allRoutes } from "@/constants/Routes";
import { ThemeChangerProvider } from "@/hooks/context/ThemeChangerContext";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";
export default function RootLayout() {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor }}>
      <ThemeChangerProvider>
        <Stack
          screenOptions={{
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor,
            },
            headerStyle: {
              backgroundColor,
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "",
            }}
          />
          {allRoutes.map((route) => (
            <Stack.Screen
              key={route.name}
              name={route.name}
              options={{
                title: route.title,
                headerShown: !route.title.includes("Slides"),
              }}
            />
          ))}
        </Stack>
      </ThemeChangerProvider>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
