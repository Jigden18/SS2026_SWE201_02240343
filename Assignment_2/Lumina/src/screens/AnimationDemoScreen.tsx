import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
  PanResponder,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import GlowCard from "../components/GlowCard";
import { Colors, Fonts, Spacing, Radius } from "../data/theme";

const { width } = Dimensions.get("window");

export default function AnimationDemoScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Animations</Text>
        <Text style={styles.subtitle}>
          All animation types used in this app
        </Text>

        <FadeDemo />
        <ScaleDemo />
        <SlideDemo />
        <DragDemo />
        <PulseDemo />
      </ScrollView>
    </SafeAreaView>
  );
}

// 1. Fade in/out
function FadeDemo() {
  const fadeVal = useRef(new Animated.Value(1)).current;
  const [visible, setVisible] = useState(true);

  function toggle() {
    Animated.timing(fadeVal, {
      toValue: visible ? 0 : 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => setVisible(!visible));
  }

  return (
    <GlowCard style={styles.card}>
      <View style={styles.cardBody}>
        <DemoLabel icon="eye" title="Fade In / Out" color={Colors.teal} />
        <Animated.View
          style={[
            styles.demoBox,
            { opacity: fadeVal, backgroundColor: `${Colors.teal}30` },
          ]}
        >
          <Feather name="star" size={28} color={Colors.teal} />
          <Text style={[styles.boxLabel, { color: Colors.teal }]}>Fading</Text>
        </Animated.View>
        <DemoButton
          label={visible ? "Fade Out" : "Fade In"}
          color={Colors.teal}
          onPress={toggle}
        />
      </View>
    </GlowCard>
  );
}

// 2. Scale / bounce
function ScaleDemo() {
  const scaleVal = useRef(new Animated.Value(1)).current;

  function bounce() {
    Animated.sequence([
      Animated.spring(scaleVal, {
        toValue: 1.35,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(scaleVal, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }

  return (
    <GlowCard style={styles.card} glowColor={Colors.violet}>
      <View style={styles.cardBody}>
        <DemoLabel icon="zap" title="Scale & Bounce" color={Colors.violet} />
        <Animated.View
          style={[
            styles.demoBox,
            {
              transform: [{ scale: scaleVal }],
              backgroundColor: `${Colors.violet}25`,
            },
          ]}
        >
          <Feather name="award" size={28} color={Colors.violet} />
          <Text style={[styles.boxLabel, { color: Colors.violet }]}>
            Spring!
          </Text>
        </Animated.View>
        <DemoButton label="Bounce" color={Colors.violet} onPress={bounce} />
      </View>
    </GlowCard>
  );
}

// 3. Slide / card transition
function SlideDemo() {
  const slideVal = useRef(new Animated.Value(0)).current;
  const [slid, setSlid] = useState(false);

  function slide() {
    Animated.spring(slideVal, {
      toValue: slid ? 0 : 1,
      friction: 7,
      useNativeDriver: true,
    }).start(() => setSlid(!slid));
  }

  const tx = slideVal.interpolate({ inputRange: [0, 1], outputRange: [0, 80] });

  return (
    <GlowCard style={styles.card} glowColor={Colors.emerald}>
      <View style={styles.cardBody}>
        <DemoLabel
          icon="move"
          title="Slide Transition"
          color={Colors.emerald}
        />
        <View style={styles.slideTrack}>
          <Animated.View
            style={[styles.slideChip, { transform: [{ translateX: tx }] }]}
          >
            <Feather name="chevrons-right" size={16} color={Colors.emerald} />
          </Animated.View>
        </View>
        <DemoButton
          label={slid ? "Slide Back" : "Slide Right"}
          color={Colors.emerald}
          onPress={slide}
        />
      </View>
    </GlowCard>
  );
}

// 4. Drag (gesture-driven)
function DragDemo() {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  // PanResponder tracks the finger and moves the view with it
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // save the last offset so the next drag starts from here
        // Use extractOffset() instead of manually accessing _value
        pan.extractOffset();
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        // flatten the offset and spring back to origin
        pan.flattenOffset();
        // snap back to center with a spring
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  return (
    <GlowCard style={styles.card} glowColor={Colors.rose}>
      <View style={styles.cardBody}>
        <DemoLabel icon="move" title="Drag Gesture" color={Colors.rose} />
        <Text style={styles.hint}>Drag the dot — it snaps back!</Text>
        <View style={styles.dragArea}>
          <Animated.View
            style={[
              styles.dragBall,
              { transform: pan.getTranslateTransform() },
            ]}
            {...panResponder.panHandlers}
          >
            <Feather name="move" size={18} color="#fff" />
          </Animated.View>
        </View>
      </View>
    </GlowCard>
  );
}

// 5. Pulse / loading indicator
function PulseDemo() {
  const pulse = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [running, setRunning] = useState(false);
  const loopRef = useRef<Animated.CompositeAnimation | null>(null);

  function toggle() {
    if (running) {
      loopRef.current?.stop();
      pulse.setValue(1);
      opacity.setValue(1);
      setRunning(false);
    } else {
      setRunning(true);
      loopRef.current = Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(pulse, {
              toValue: 1.4,
              duration: 700,
              useNativeDriver: true,
            }),
            Animated.timing(pulse, {
              toValue: 1,
              duration: 700,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 0.3,
              duration: 700,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 1,
              duration: 700,
              useNativeDriver: true,
            }),
          ]),
        ]),
      );
      loopRef.current.start();
    }
  }

  return (
    <GlowCard style={styles.card} glowColor={Colors.violet}>
      <View style={styles.cardBody}>
        <DemoLabel
          icon="activity"
          title="Pulse / Loading"
          color={Colors.violet}
        />
        <View style={styles.pulseWrap}>
          {/* outer ring pulses */}
          <Animated.View
            style={[
              styles.pulseRing,
              { transform: [{ scale: pulse }], opacity },
            ]}
          />
          <View style={styles.pulseDot}>
            <Feather name="loader" size={20} color={Colors.violet} />
          </View>
        </View>
        <DemoButton
          label={running ? "Stop" : "Start Pulse"}
          color={Colors.violet}
          onPress={toggle}
        />
      </View>
    </GlowCard>
  );
}

// ─── Shared small components ─────────────────────────────────────────────────
interface DemoLabelProps {
  icon: string;
  title: string;
  color: string;
}

function DemoLabel({ icon, title, color }: DemoLabelProps) {
  return (
    <View style={styles.demoLabel}>
      <Feather name={icon as any} size={14} color={color} />
      <Text style={[styles.demoTitle, { color }]}>{title}</Text>
    </View>
  );
}

interface DemoButtonProps {
  label: string;
  color: string;
  onPress: () => void;
}

function DemoButton({ label, color, onPress }: DemoButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.demoBtn,
        { borderColor: `${color}60`, backgroundColor: `${color}15` },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.demoBtnText, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: Spacing.md, paddingBottom: 40 },
  title: { fontSize: Fonts.xxl, fontWeight: "800", color: Colors.textPrimary },
  subtitle: {
    fontSize: Fonts.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
    marginTop: 4,
  },

  card: { marginBottom: Spacing.lg },
  cardBody: { padding: Spacing.lg, alignItems: "center", gap: Spacing.md },

  demoLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },
  demoTitle: { fontSize: Fonts.md, fontWeight: "700" },

  demoBox: {
    width: 110,
    height: 110,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  boxLabel: { fontSize: Fonts.sm, fontWeight: "600" },

  demoBtn: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  demoBtnText: { fontSize: Fonts.sm, fontWeight: "700" },

  slideTrack: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.bgElevated,
    borderRadius: Radius.md,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  slideChip: {
    width: 50,
    height: 36,
    backgroundColor: `${Colors.emerald}25`,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: `${Colors.emerald}50`,
  },

  hint: {
    fontSize: Fonts.sm,
    color: Colors.textSecondary,
    alignSelf: "flex-start",
  },
  dragArea: {
    width: "100%",
    height: 130,
    backgroundColor: Colors.bgElevated,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  dragBall: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.rose,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: Colors.rose,
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },

  pulseWrap: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  pulseRing: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Colors.violet}20`,
    borderWidth: 2,
    borderColor: `${Colors.violet}50`,
  },
  pulseDot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: `${Colors.violet}30`,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: Colors.violet,
  },
});
