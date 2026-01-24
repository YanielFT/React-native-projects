import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";
import { Href, router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import ThemedText from "../shared/ThemedText";
interface Props {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  name: string;
  isFirst?: boolean;
  isLast?: boolean;
}

const MenuItem = ({ title, icon, name, isFirst, isLast }: Props) => {
  const primaryColor = useThemeColor({}, "primary") as string;

  return (
    <Pressable
      className={clsx(
        "bg-white dark:bg-black/15 px-5 py-2",
        isFirst ? "rounded-t-md" : "",
        isLast ? "rounded-b-md" : "",
      )}
      onPress={() => router.push(name.split("/")[0] as Href)}
    >
      <View className="flex gap-5 flex-row items-center">
        <Ionicons name={icon} size={30} color={primaryColor} />
        <ThemedText type="h2">{title}</ThemedText>
      </View>
    </Pressable>
  );
};

export default MenuItem;
