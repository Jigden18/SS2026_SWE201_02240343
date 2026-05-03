import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Colors, Radius } from "../data/theme";

interface GlowCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  glowColor?: string;
}

// a card with a subtle glow border — used everywhere in the app
export default function GlowCard({
  children,
  style,
  glowColor,
}: GlowCardProps) {
  const glow = glowColor || Colors.teal;

  return (
    <View style={[styles.wrapper, { shadowColor: glow }, style]}>
      <View style={[styles.border, { borderColor: `${glow}30` }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  border: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: "hidden",
  },
});
