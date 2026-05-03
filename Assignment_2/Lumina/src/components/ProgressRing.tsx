import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import Svg, { Circle, CircleProps } from "react-native-svg";
import { Colors, Fonts } from "../data/theme";

interface ProgressRingProps {
  size?: number;
  strokeWidth?: number;
  progress?: number;
  color?: string;
  label?: string;
}

// animated ring that fills up to show a percentage
export default function ProgressRing({
  size = 80,
  strokeWidth = 6,
  progress = 0,
  color,
  label,
}: ProgressRingProps) {
  const animVal = useRef(new Animated.Value(0)).current;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    Animated.timing(animVal, {
      toValue: progress,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const dashOffset = animVal.interpolate({
    inputRange: [0, 1],
    outputRange: [circ, 0],
  });

  // Animated.createAnimatedComponent lets us animate SVG props
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* track ring */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={Colors.bgElevated}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* progress ring */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color || Colors.teal}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={[styles.label, { width: size, height: size }]}>
        <Text style={[styles.pct, { color: color || Colors.teal }]}>
          {Math.round(progress * 100)}%
        </Text>
        {label && <Text style={styles.sub}>{label}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  pct: {
    fontSize: Fonts.sm,
    fontWeight: "700",
  },
  sub: {
    fontSize: Fonts.xs,
    color: Colors.textMuted,
    marginTop: 1,
  },
});
