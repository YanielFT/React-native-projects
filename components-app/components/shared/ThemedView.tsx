import React from "react";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = ViewProps & {
  className?: string;
  margin?: boolean;
  safe?: boolean;
  bgColor?: string;
};

const ThemedView = ({
  style,
  className,
  margin = false,
  children,
  bgColor,
  safe = false,
}: Props) => {
  //If you prefer using a theme hook, you can uncomment the following lines
  // const backgroundColor = bgColor ?? useThemeColor({}, "background");
  const safeArea = useSafeAreaInsets();
  return (
    <View
      className={` bg-light-background dark:bg-dark-background ${className}`}
      style={[
        {
          flex: 1,
          paddingTop: safe ? safeArea.top : 0,
          margin: margin ? 10 : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default ThemedView;
