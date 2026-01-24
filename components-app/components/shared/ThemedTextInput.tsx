import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  classname?: string;
}

const ThemedTextInput = ({ className, ...rest }: Props) => {
  const color = useThemeColor({}, "text");
  return (
    <TextInput
      className={`${className} py-4 px-2 text-black dark:text-white`}
      placeholder="Name..."
      placeholderTextColor={color}
      {...rest}
    />
  );
};

export default ThemedTextInput;

const styles = StyleSheet.create({});
