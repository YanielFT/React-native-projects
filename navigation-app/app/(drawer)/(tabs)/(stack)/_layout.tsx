import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { router, Stack, useNavigation } from "expo-router";
import React from "react";

const StackLayout = () => {
  const navigation = useNavigation();
  const onHeaderLeft = (canGoBack?: boolean) => {
    if (canGoBack) {
      router.back();
    } else navigation.dispatch(DrawerActions.toggleDrawer);
  };

  return (
    <Stack
      screenOptions={{
        animation: "ios_from_left",
        // headerShown: false,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: "white",
        },
        headerLeft: ({ tintColor, canGoBack }) => (
          <Ionicons
            size={28}
            className="mr-5"
            color={tintColor}
            onPress={() => onHeaderLeft(canGoBack)}
            name={canGoBack ? "arrow-back-outline" : "grid-outline"}
          />
        ),
      }}
    >
      <Stack.Screen name="home/index" options={{ title: "Home Screen" }} />
      <Stack.Screen
        name="products/index"
        options={{
          title: "Home Screen",
        }}
      />
      <Stack.Screen
        name="profile/index"
        options={{ title: "Profile Screen" }}
      />
      <Stack.Screen
        name="settings/index"
        options={{ title: "Settings Screen" }}
      />
    </Stack>
  );
};

export default StackLayout;
