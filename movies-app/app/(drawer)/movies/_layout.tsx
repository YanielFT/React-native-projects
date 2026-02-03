import { Slot, Stack } from "expo-router";
export default function MoviesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "ios_from_right",
        animationDuration: 300,
      }}
    >
      <Stack.Screen
        name="modal-search"
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "slide_from_bottom", // Hace el slide igual que iOS
          gestureDirection: "vertical", // Swipe vertical como iOS
        }}
      />
      <Slot />
    </Stack>
  );
}
