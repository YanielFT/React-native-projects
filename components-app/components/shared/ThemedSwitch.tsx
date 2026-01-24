import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { Platform, Pressable, SwitchProps } from "react-native";
import { Switch } from "react-native-gesture-handler";
import ThemedText from "./ThemedText";

interface Props extends SwitchProps {
  text?: string;
  value: boolean;
  className?: string;

  onValueChange: (value: boolean) => void;
}

const isAndroid = Platform.OS === "android";

const ThemedSwitch = ({ value, className, onValueChange, text }: Props) => {
  const color = useThemeColor({}, "primary");

  return (
    <Pressable
      className={`${className} flex items-center
         flex-row w-full
         justify-between active:opacity-80`}
      onPress={() => onValueChange(!value)}
    >
      {text && <ThemedText type="normal">{text}</ThemedText>}
      <Switch
        trackColor={{ true: color }}
        thumbColor={isAndroid && value ? "white" : color}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
      />
    </Pressable>
  );
};

export default ThemedSwitch;
