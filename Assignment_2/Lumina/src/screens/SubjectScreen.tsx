import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import GlowCard from "../components/GlowCard";
import ProgressRing from "../components/ProgressRing";
import { Colors, Fonts, Spacing, Radius } from "../data/theme";
import { subjects } from "../data/mockData";

interface SubjectsScreenProps {
  navigation: {
    navigate: (screen: string, params: { subject: any }) => void;
  };
}

export default function SubjectsScreen({ navigation }: SubjectsScreenProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Subjects</Text>
        <Text style={styles.subtitle}>{subjects.length} modules enrolled</Text>
      </View>

      <FlatList
        data={subjects}
        keyExtractor={(item: any) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }: { item: any; index: number }) => (
          <SubjectCard
            subject={item}
            index={index}
            onPress={() =>
              navigation.navigate("SubjectDetail", { subject: item })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

interface SubjectCardProps {
  subject: {
    id: string;
    name: string;
    completed: number;
    tasks: number;
    color: string;
  };
  index: number;
  onPress: () => void;
}

// each card slides in with a small delay based on its position
function SubjectCard({ subject, index, onPress }: SubjectCardProps) {
  const slideAnim = useRef(new Animated.Value(40)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const pct = subject.completed / subject.tasks;

  return (
    <Animated.View
      style={[
        styles.cardWrap,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <GlowCard glowColor={subject.color}>
          <View style={styles.cardInner}>
            {/* icon badge */}
            <View
              style={[
                styles.iconBadge,
                { backgroundColor: `${subject.color}20` },
              ]}
            >
              <Feather name="book" size={20} color={subject.color} />
            </View>

            {/* name */}
            <Text style={styles.subjectName}>{subject.name}</Text>

            {/* task count */}
            <Text style={styles.taskCount}>
              {subject.completed}/{subject.tasks} tasks
            </Text>

            {/* progress bar */}
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${pct * 100}%`, backgroundColor: subject.color },
                ]}
              />
            </View>
          </View>
        </GlowCard>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: { fontSize: Fonts.xxl, fontWeight: "800", color: Colors.textPrimary },
  subtitle: { fontSize: Fonts.sm, color: Colors.textSecondary, marginTop: 2 },

  list: { paddingHorizontal: Spacing.md, paddingBottom: 30 },
  row: { justifyContent: "space-between", marginBottom: Spacing.sm },
  cardWrap: { width: "48%" },

  cardInner: { padding: Spacing.md },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  subjectName: {
    fontSize: Fonts.md,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  taskCount: {
    fontSize: Fonts.xs,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },

  progressTrack: {
    height: 4,
    backgroundColor: Colors.bgElevated,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 2 },
});
