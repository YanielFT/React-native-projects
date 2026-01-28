import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "transparentModal", // Fuerza estilo iOS
        animation: "slide_from_bottom", // Hace el slide igual que iOS
        gestureDirection: "vertical", // Swipe vertical como iOS
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="modal-example" />
      <Stack.Screen name="modal-example-2" />
    </Stack>
  );
}
