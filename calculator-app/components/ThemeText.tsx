import { globalStyles } from "@/styles/globasl-styles";
import React from "react";
import { Text, TextProps } from "react-native";

interface Props extends TextProps {
  variant?: "h1" | "h2";
}

const ThemeText = ({ children, variant = "h1", style, ...rest }: Props) => {
  return (
    <Text
      {...rest}
      style={[
        style,
        variant === "h1" && globalStyles.mainResult,
        variant === "h2" && globalStyles.subResult,
    ]}
    >
      {children}
    </Text>
  );
};

export default ThemeText;
