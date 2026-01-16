import CustomDrawer from "@/components/shared/CustomDrawer";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { Dimensions } from "react-native";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
const DrawerLayout = () => {
  return (
    <Drawer
      drawerContent={CustomDrawer}
      screenOptions={{
        drawerStyle: {
          width: screenWidth * 0.7,
          height: screenHeight,
        },
        overlayColor: "rgba(0,0,0,0.4)",
        drawerActiveTintColor: "indigo",
        headerShadowVisible: false,
        sceneStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)" // This is the name of the page and must match the url from root
        options={{
          headerShown: false,
          drawerLabel: "Tabs + Stack",
          drawerIcon: ({ color, size }) => {
            return <Ionicons name="albums-outline" size={size} color={color} />;
          },
          title: "Tabs + Stack",
        }}
      />
      <Drawer.Screen
        name="user/index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Users",
          drawerIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="person-circle-outline"
                size={size}
                color={color}
              />
            );
          },
          title: "Users",
        }}
      />
      <Drawer.Screen
        name="schedule/index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Schedule",
          title: "Schedule",
          drawerIcon: ({ color, size }) => {
            return (
              <Ionicons name="calendar-outline" size={size} color={color} />
            );
          },
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
