import { View, Text, StyleSheet, Pressable, Vibration } from "react-native";
import React from "react";

interface Props {
  label: string;
  onPress?: () => void;
  onLongPress?: () => void;
  position?: "left" | "right";
}

export default function FAB({ position, label, onPress, onLongPress }: Props) {
  return (
    <Pressable
      onPress={() => {
        onPress?.();
        Vibration.vibrate([0, 20]);
      }}
      onLongPress={() => {
        onLongPress?.();
        Vibration.vibrate([0, 100]);
      }}
      style={({ pressed }) => [
        styles.floatingButtons,
        pressed ? { opacity: 0.7 } : { opacity: 1 },
        position === "left" ? styles.positionLeft : styles.positionRight,
      ]}
    >
      <Text style={{ color: "white", fontSize: 25 }}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  floatingButtons: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#65558F",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 3,
  },
  positionRight: {
    right: 20,
  },
  positionLeft: {
    left: 20,
  },
});
