import { Colors } from "@/constants/theme";
import { globalStyles } from "@/styles/globasl-styles";
import * as Haptics from "expo-haptics";
import React from "react";
import { ColorValue, Pressable, PressableProps, Text } from "react-native";
interface Props extends PressableProps {
  label: string;
  color?: ColorValue;
  doubleSize?: boolean;
  blackText?: boolean;
  onPress?: () => void;
}

const CalculatorButton = ({
  onPress,
  color = Colors.darkGray,
  blackText,
  label,
  doubleSize = false,
  ...rest
}: Props) => {
  return (
    <Pressable
      onPress={() => {
        // Vibration.vibrate([0, 40]);
        Haptics.selectionAsync();
        onPress?.();
      }}
      {...rest}
      style={({ pressed }) => ({
        ...globalStyles.button,
        backgroundColor: color,
        opacity: pressed ? 0.7 : 1,
        width: doubleSize ? 180 : 80,
      })}
    >
      <Text
        style={{
          ...globalStyles.buttonText,
          color: blackText ? "black" : "white",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default CalculatorButton;
