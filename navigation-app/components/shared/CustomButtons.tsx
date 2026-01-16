import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

interface Props extends PressableProps {
  children: string;
  color?: "primary" | "secondary" | "tertiary";
}

const CustomButtons = ({
  children,
  onPress,
  onLongPress,
  color = "primary",
  ...rest
}: Props) => {
  const btnColor = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    tertiary: "bg-tertiary",
  }[color];

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      className={`p-3 rounded-md ${btnColor} active:opacity-90`}
    >
      <Text className="text-white text-center">{children}</Text>
    </Pressable>
  );
};

export default CustomButtons;
