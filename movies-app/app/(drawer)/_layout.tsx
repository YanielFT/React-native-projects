import CustomDrawer from "@/components/Drawer/CustomDrawer";
import { QueryClient } from "@tanstack/react-query";
import { Drawer } from "expo-router/drawer";
import { Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Drawer
        drawerContent={CustomDrawer}
        screenOptions={{
          drawerStyle: {
            width: screenWidth * 0.7,
            height: screenHeight,
            backgroundColor: "black",
          },
          overlayColor: "rgba(0,0,0,0.3)",
          drawerActiveTintColor: "#800000",
          drawerActiveBackgroundColor: "white",
          drawerInactiveTintColor: "#ffffff",
          headerShadowVisible: false,
          headerShown: false,
          drawerLabelStyle: { fontFamily: "Acme-Regular", fontSize: 18 },
          sceneStyle: { backgroundColor: "black" },
        }}
      >
        <Drawer.Screen
          name="movies/index"
          options={{
            headerShadowVisible: false,
            headerShown: false,
            drawerLabel: "Movies",
            title: "Movies",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
