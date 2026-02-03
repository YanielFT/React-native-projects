import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { useState } from "react";
import ThemedSwitch from "../shared/ThemedSwitch";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const [first, setfirst] = useState(false);
  return (
    <DrawerContentScrollView {...props}>
      <ThemedSwitch
        text="Dark Mode"
        className="mb-4 px-5"
        value={first}
        onValueChange={() => {}}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
