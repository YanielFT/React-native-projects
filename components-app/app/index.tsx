import MenuItem from "@/components/menu/MenuItem";
import ThemedView from "@/components/shared/ThemedView";
import {
  animationMenuRoutes,
  menuRoutes,
  uiMenuRoutes,
} from "@/constants/Routes";
import React from "react";
import { View } from "react-native";

const Index = () => {
  return (
    <ThemedView margin>
      {animationMenuRoutes.map((route, index) => (
        <MenuItem
          key={route.name}
          icon={route.icon}
          name={route.name.split("/")[0]}
          title={route.title}
          isFirst={index === 0}
          isLast={index === animationMenuRoutes.length - 1}
        />
      ))}
      <View className="mb-5" />
      {uiMenuRoutes.map((route, index) => (
        <MenuItem
          key={route.name}
          icon={route.icon}
          name={route.name.split("/")[0]}
          title={route.title}
          isFirst={index === 0}
          isLast={index === uiMenuRoutes.length - 1}
        />
      ))}

      <View className="mb-5" />
      {menuRoutes.map((route, index) => (
        <MenuItem
          key={route.name}
          icon={route.icon}
          name={route.name.split("/")[0]}
          title={route.title}
          isFirst={index === 0}
          isLast={index === menuRoutes.length - 1}
        />
      ))}
    </ThemedView>
  );
};

export default Index;
