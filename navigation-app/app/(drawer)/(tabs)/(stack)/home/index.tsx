import CustomButtons from "@/components/shared/CustomButtons";
import { DrawerActions } from "@react-navigation/native";
import { Link, router, useNavigation } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const HomeScreen = () => {
  const navigation = useNavigation();
  const onToggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer);
  };

  return (
    <SafeAreaView>
      <View className="mt-5 px-10 flex-col gap-2">
        {/* <Link className="mb-5" href="/products">
          Products
        </Link>
        <Link className="mb-5" href="/settings">
          Settings
        </Link>
        <Link className="mb-5" href="/profile">
          Profile
        </Link> */}
        <Link className="mb-5" href="/products" asChild>
          <CustomButtons>Products (Link as Child)</CustomButtons>
        </Link>
        <CustomButtons onPress={() => router.push("/products")}>
          Products
        </CustomButtons>
        <CustomButtons
          color="secondary"
          onPress={() => router.push("/profile")}
        >
          Profile
        </CustomButtons>
        <CustomButtons
          color="tertiary"
          onPress={() => router.push("/settings")}
        >
          Settings
        </CustomButtons>
        <CustomButtons
          onPress={onToggleDrawer}
          color="primary"
        >
          Abrir menú
        </CustomButtons>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
