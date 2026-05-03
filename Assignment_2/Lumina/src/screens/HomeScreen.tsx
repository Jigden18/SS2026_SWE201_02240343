import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import GlowCard from "../components/GlowCard";
import ProgressRing from "../components/ProgressRing";
import { Colors, Fonts, Spacing, Radius } from "../data/theme";
import {
  tasks,
  weeklyHours,
  weekDays,
  streakData,
  quotes,
} from "../data/mockData";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const [quote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);
  const doneTasks = tasks.filter((t: any) => t.done).length;
  const totalTasks = tasks.length;

  useEffect(() => {
    // everything fades and slides in together on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          {/* header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good morning!</Text>
              <Text style={styles.date}>{today}</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>SD</Text>
            </View>
          </View>

          {/* quote card */}
          <LinearGradient
            colors={["#00D4B420", "#8B5CF610"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.quoteCard}
          >
            <Feather name="sun" size={16} color={Colors.teal} />
            <Text style={styles.quoteText}>"{quote.text}"</Text>
            <Text style={styles.quoteAuthor}>— {quote.author}</Text>
          </LinearGradient>

          {/* stats row */}
          <View style={styles.statsRow}>
            <StatCard
              label="Tasks Done"
              value={`${doneTasks}/${totalTasks}`}
              icon="check-circle"
              color={Colors.teal}
            />
            <StatCard
              label="Day Streak"
              value={streakData.current}
              icon="zap"
              color={Colors.violet}
            />
            <StatCard
              label="Focus Hrs"
              value="4.5h"
              icon="clock"
              color={Colors.emerald}
            />
          </View>

          {/* weekly bar chart */}
          <GlowCard style={styles.section}>
            <View style={styles.sectionPad}>
              <Text style={styles.sectionTitle}>Weekly Focus</Text>
              <View style={styles.barChart}>
                {weeklyHours.map((h: number, i: number) => (
                  <BarColumn
                    key={i}
                    hours={h}
                    day={weekDays[i]}
                    isToday={i === 4}
                  />
                ))}
              </View>
            </View>
          </GlowCard>

          {/* today's tasks */}
          <View style={styles.taskHeader}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {tasks.slice(0, 4).map((task: any, i: number) => (
            <TaskRow key={task.id} task={task} delay={i * 80} />
          ))}

          {/* overall progress */}
          <GlowCard style={styles.section}>
            <View style={styles.progressPad}>
              <Text style={styles.sectionTitle}>Overall Progress</Text>
              <View style={styles.ringsRow}>
                <ProgressRing
                  size={76}
                  progress={doneTasks / totalTasks}
                  color={Colors.teal}
                  label="Tasks"
                />
                <ProgressRing
                  size={76}
                  progress={0.72}
                  color={Colors.violet}
                  label="Goals"
                />
                <ProgressRing
                  size={76}
                  progress={0.58}
                  color={Colors.emerald}
                  label="Focus"
                />
              </View>
            </View>
          </GlowCard>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  suffix?: string;
}

// small stat card in the top row
function StatCard({ label, value, icon, color, suffix }: StatCardProps) {
  return (
    <GlowCard style={styles.statCard} glowColor={color}>
      <View style={styles.statPad}>
        <Feather name={icon as any} size={14} color={color} />
        <Text style={[styles.statValue, { color }]}>
          {value}
          {suffix}
        </Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </GlowCard>
  );
}

interface BarColumnProps {
  hours: number;
  day: string;
  isToday: boolean;
}

// single bar in the weekly chart
function BarColumn({ hours, day, isToday }: BarColumnProps) {
  const heightAnim = useRef(new Animated.Value(0)).current;
  const maxH = 60;
  const barH = (hours / 6) * maxH;

  useEffect(() => {
    Animated.spring(heightAnim, {
      toValue: barH,
      delay: 300,
      friction: 6,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.barCol}>
      <Text style={styles.barHours}>{hours}h</Text>
      <View style={[styles.barTrack, { height: maxH }]}>
        <Animated.View
          style={[
            styles.bar,
            {
              height: heightAnim,
              backgroundColor: isToday ? Colors.teal : Colors.violet,
              opacity: isToday ? 1 : 0.5,
            },
          ]}
        />
      </View>
      <Text style={[styles.barDay, isToday && { color: Colors.teal }]}>
        {day}
      </Text>
    </View>
  );
}

// Define the priority type
type TaskPriority = "high" | "medium" | "low";

interface Task {
  id: string;
  title: string;
  subject: string;
  due: string;
  done: boolean;
  priority: TaskPriority;
}

interface TaskRowProps {
  task: Task;
  delay?: number;
}

// a single task row with priority dot
function TaskRow({ task }: TaskRowProps) {
  const priorityColor = {
    high: Colors.rose,
    medium: Colors.violet,
    low: Colors.teal,
  }[task.priority];

  return (
    <GlowCard style={styles.taskCard}>
      <View style={styles.taskRow}>
        <View
          style={[styles.priorityDot, { backgroundColor: priorityColor }]}
        />
        <View style={styles.taskInfo}>
          <Text style={[styles.taskTitle, task.done && styles.taskDone]}>
            {task.title}
          </Text>
          <Text style={styles.taskMeta}>
            {task.subject} · {task.due}
          </Text>
        </View>
        {task.done && (
          <Feather name="check-circle" size={16} color={Colors.teal} />
        )}
      </View>
    </GlowCard>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  content: { padding: Spacing.md, paddingBottom: 30 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: Fonts.xl,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  date: { fontSize: Fonts.sm, color: Colors.textSecondary, marginTop: 2 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${Colors.teal}25`,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.teal,
  },
  avatarText: { fontSize: Fonts.sm, fontWeight: "700", color: Colors.teal },

  quoteCard: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quoteText: {
    fontSize: Fonts.md,
    color: Colors.textPrimary,
    fontStyle: "italic",
    marginTop: Spacing.xs,
    lineHeight: 22,
  },
  quoteAuthor: {
    fontSize: Fonts.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },

  statsRow: { flexDirection: "row", gap: Spacing.sm, marginBottom: Spacing.lg },
  statCard: { flex: 1 },
  statPad: { padding: Spacing.sm, alignItems: "center", gap: 4 },
  statValue: { fontSize: Fonts.lg, fontWeight: "800" },
  statLabel: { fontSize: Fonts.xs, color: Colors.textMuted },

  section: { marginBottom: Spacing.lg },
  sectionPad: { padding: Spacing.md },
  sectionTitle: {
    fontSize: Fonts.lg,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },

  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  seeAll: { fontSize: Fonts.sm, color: Colors.teal },

  taskCard: { marginBottom: Spacing.sm },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  priorityDot: { width: 8, height: 8, borderRadius: 4 },
  taskInfo: { flex: 1 },
  taskTitle: {
    fontSize: Fonts.md,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  taskDone: { textDecorationLine: "line-through", color: Colors.textMuted },
  taskMeta: { fontSize: Fonts.xs, color: Colors.textSecondary, marginTop: 2 },

  barChart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  barCol: { alignItems: "center", gap: 4 },
  barHours: { fontSize: 9, color: Colors.textMuted },
  barTrack: {
    width: 28,
    justifyContent: "flex-end",
    backgroundColor: Colors.bgElevated,
    borderRadius: 4,
    overflow: "hidden",
  },
  bar: { width: "100%", borderRadius: 4 },
  barDay: { fontSize: Fonts.xs, color: Colors.textMuted },

  progressPad: { padding: Spacing.md },
  ringsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Spacing.sm,
  },
});
