import React, { useRef, useEffect } from "react";
import { TouchableOpacity, Animated, StyleSheet } from "react-native";
import { Colors } from "../data/theme";

interface TabButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  focused: boolean;
}

// custom tab button with bounce animation on select
export default function TabButton({
  children,
  onPress,
  focused,
}: TabButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (focused) {
      // small bounce when tab gets selected
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focused]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.btn}>
      <Animated.View
        style={[
          styles.inner,
          focused && styles.active,
          { transform: [{ scale }] },
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  active: {
    backgroundColor: `${Colors.teal}18`,
  },
});
