import React from "react";
import { Pressable, PressableProps } from "react-native";
import ThemedText from "./ThemedText";

interface Props extends PressableProps {
  children: string;
}

const ThemedButton = ({ children, className, ...rest }: Props) => {
  return (
    <Pressable
      className={`bg-light-primary dark:bg-dark-primary items-center rounded-xl px-6 py-2 active:opacity-15  ${className}`}
      {...rest}
    >
      <ThemedText type="h2" className="text-white">
        {children}
      </ThemedText>
    </Pressable>
  );
};

export default ThemedButton;
