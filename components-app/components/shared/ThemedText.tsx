import React from "react";
import { Text, TextProps } from "react-native";

type Props = TextProps & {
  className?: string;
  type?: "normal" | "h1" | "h2" | "semi-bold" | "link";
};

const ThemedText = ({ className, type = "normal", ...rest }: Props) => {
  const textStyle = {
    normal: "text-light-text dark:text-dark-text",
    h2: "text-xl font-semibold text-light-text dark:text-dark-text",
    h1: "text-2xl text-light-text dark:text-dark-text",
    "semi-bold": " text-light-text dark:text-dark-text",
    link: "text-blue-500",
  }[type];
  return (
    <Text className={`${className} ${textStyle}`} {...rest}>
      {rest.children}
    </Text>
  );
};

export default ThemedText;
