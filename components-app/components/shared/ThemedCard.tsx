import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

interface Props extends ViewProps {
  className?: string;
}

const ThemedCard = ({ className, children, ...rest }: Props) => {
  return (
    <View
      {...rest}
      className={`bg-white dark:bg-black/40 rounded-xl p-2 shadow shadow-black/5 ${className}`}
    >
      <View>{children}</View>
    </View>
  );
};

export default ThemedCard;

const styles = StyleSheet.create({});
