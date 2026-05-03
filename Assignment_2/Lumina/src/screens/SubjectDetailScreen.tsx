import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import GlowCard from "../components/GlowCard";
import ProgressRing from "../components/ProgressRing";
import { Colors, Fonts, Spacing, Radius } from "../data/theme";
import { tasks } from "../data/mockData";

interface SubjectDetailScreenProps {
  route: {
    params: {
      subject: {
        name: string;
        completed: number;
        tasks: number;
        color: string;
      };
    };
  };
  navigation: {
    goBack: () => void;
  };
}

export default function SubjectDetailScreen({
  route,
  navigation,
}: SubjectDetailScreenProps) {
  const { subject } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // filter tasks that belong to this subject
  const myTasks = tasks.filter((t: any) => t.subject === subject.name);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const pct = subject.completed / subject.tasks;

  return (
    <SafeAreaView style={styles.safe}>
      <Animated.ScrollView
        style={{ opacity: fadeAnim }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* back button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={22} color={Colors.textPrimary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* hero banner */}
        <LinearGradient
          colors={[`${subject.color}30`, `${subject.color}08`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View
            style={[styles.heroIcon, { backgroundColor: `${subject.color}25` }]}
          >
            <Feather name="book" size={32} color={subject.color} />
          </View>
          <Text style={styles.heroTitle}>{subject.name}</Text>
          <Text style={styles.heroSub}>Semester 2 · Active</Text>

          {/* big progress ring */}
          <ProgressRing
            size={100}
            strokeWidth={8}
            progress={pct}
            color={subject.color}
            label="Done"
          />
        </LinearGradient>

        {/* quick stats */}
        <View style={styles.statsRow}>
          <QuickStat
            label="Total Tasks"
            value={subject.tasks}
            color={subject.color}
          />
          <QuickStat
            label="Completed"
            value={subject.completed}
            color={Colors.emerald}
          />
          <QuickStat
            label="Remaining"
            value={subject.tasks - subject.completed}
            color={Colors.rose}
          />
        </View>

        {/* task list for this subject */}
        <Text style={styles.sectionTitle}>Tasks</Text>
        {myTasks.length === 0 ? (
          <Text style={styles.emptyText}>No tasks for this subject yet.</Text>
        ) : (
          myTasks.map((task: any) => (
            <GlowCard
              key={task.id}
              style={styles.taskCard}
              glowColor={subject.color}
            >
              <View style={styles.taskRow}>
                <View
                  style={[
                    styles.checkBox,
                    task.done && {
                      backgroundColor: subject.color,
                      borderColor: subject.color,
                    },
                  ]}
                >
                  {task.done && <Feather name="check" size={11} color="#000" />}
                </View>
                <View style={styles.taskInfo}>
                  <Text
                    style={[styles.taskTitle, task.done && styles.taskDone]}
                  >
                    {task.title}
                  </Text>
                  <Text style={styles.taskDue}>Due: {task.due}</Text>
                </View>
                <View
                  style={[
                    styles.priorityBadge,
                    { borderColor: `${subject.color}50` },
                  ]}
                >
                  <Text style={[styles.priorityText, { color: subject.color }]}>
                    {task.priority}
                  </Text>
                </View>
              </View>
            </GlowCard>
          ))
        )}

        {/* notes placeholder */}
        <GlowCard style={styles.notesCard} glowColor={subject.color}>
          <View style={styles.notesPad}>
            <Feather name="file-text" size={18} color={subject.color} />
            <Text style={styles.notesTitle}>Study Notes</Text>
            <Text style={styles.notesBody}>
              Tap here to add notes, formulas, or key concepts for{" "}
              {subject.name}.
            </Text>
          </View>
        </GlowCard>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

interface QuickStatProps {
  label: string;
  value: number;
  color: string;
}

function QuickStat({ label, value, color }: QuickStatProps) {
  return (
    <GlowCard style={styles.statCard} glowColor={color}>
      <View style={styles.statPad}>
        <Text style={[styles.statValue, { color }]}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </GlowCard>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: Spacing.md, paddingBottom: 40 },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
    gap: 4,
  },
  backText: {
    fontSize: Fonts.md,
    color: Colors.textPrimary,
    fontWeight: "500",
  },

  hero: {
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: "center",
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: Fonts.xxl,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  heroSub: { fontSize: Fonts.sm, color: Colors.textSecondary },

  statsRow: { flexDirection: "row", gap: Spacing.sm, marginBottom: Spacing.lg },
  statCard: { flex: 1 },
  statPad: { padding: Spacing.sm, alignItems: "center" },
  statValue: { fontSize: Fonts.xl, fontWeight: "800" },
  statLabel: { fontSize: Fonts.xs, color: Colors.textMuted },

  sectionTitle: {
    fontSize: Fonts.lg,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },

  taskCard: { marginBottom: Spacing.sm },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  taskInfo: { flex: 1 },
  taskTitle: {
    fontSize: Fonts.md,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  taskDone: { textDecorationLine: "line-through", color: Colors.textMuted },
  taskDue: { fontSize: Fonts.xs, color: Colors.textSecondary, marginTop: 2 },
  priorityBadge: {
    borderWidth: 1,
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  priorityText: {
    fontSize: Fonts.xs,
    fontWeight: "600",
    textTransform: "capitalize",
  },

  notesCard: { marginTop: Spacing.sm },
  notesPad: { padding: Spacing.lg, gap: Spacing.sm },
  notesTitle: {
    fontSize: Fonts.md,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  notesBody: {
    fontSize: Fonts.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  emptyText: {
    fontSize: Fonts.md,
    color: Colors.textMuted,
    textAlign: "center",
    marginVertical: Spacing.xl,
  },
});
