import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import GlowCard from "../components/GlowCard";
import ProgressRing from "../components/ProgressRing";
import { Colors, Fonts, Spacing, Radius } from "../data/theme";
import { streakData, subjects } from "../data/mockData";

export default function ProfileScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // local toggle states for settings
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [focusReminder, setFocusReminder] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const totalDone = subjects.reduce((a: number, s: any) => a + s.completed, 0);
  const totalAll = subjects.reduce((a: number, s: any) => a + s.tasks, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <Animated.ScrollView
        style={{ opacity: fadeAnim }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* profile card */}
        <LinearGradient
          colors={["#8B5CF620", "#00D4B415"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileCard}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SD</Text>
          </View>
          <Text style={styles.name}>Sonam Dorji</Text>
          <Text style={styles.email}>02230305.cst@rub.edu.bt</Text>
          <Text style={styles.badge}>Software Engineering · Year 2</Text>
        </LinearGradient>

        {/* streak & stats */}
        <View style={styles.statsRow}>
          <GlowCard style={styles.statCard} glowColor={Colors.violet}>
            <View style={styles.statPad}>
              <Text style={[styles.statVal, { color: Colors.violet }]}>
                {streakData.current}
              </Text>
              <Text style={styles.statLbl}>Day Streak</Text>
            </View>
          </GlowCard>
          <GlowCard style={styles.statCard} glowColor={Colors.teal}>
            <View style={styles.statPad}>
              <Text style={[styles.statVal, { color: Colors.teal }]}>
                {subjects.length}
              </Text>
              <Text style={styles.statLbl}>Subjects</Text>
            </View>
          </GlowCard>
          <GlowCard style={styles.statCard} glowColor={Colors.emerald}>
            <View style={styles.statPad}>
              <Text style={[styles.statVal, { color: Colors.emerald }]}>
                {Math.round((totalDone / totalAll) * 100)}%
              </Text>
              <Text style={styles.statLbl}>Completion</Text>
            </View>
          </GlowCard>
        </View>

        {/* overall progress ring */}
        <GlowCard style={styles.section}>
          <View style={styles.ringPad}>
            <View style={styles.ringRow}>
              <ProgressRing
                size={90}
                strokeWidth={8}
                progress={totalDone / totalAll}
                color={Colors.teal}
              />
              <View style={styles.ringInfo}>
                <Text style={styles.ringTitle}>Semester Progress</Text>
                <Text style={styles.ringDetail}>
                  {totalDone} of {totalAll} tasks completed across all modules
                </Text>
                <Text
                  style={[
                    styles.ringDetail,
                    { color: Colors.teal, marginTop: 4 },
                  ]}
                >
                  Best streak: {streakData.best} days
                </Text>
              </View>
            </View>
          </View>
        </GlowCard>

        {/* settings section */}
        <Text style={styles.sectionTitle}>Settings</Text>

        <GlowCard style={styles.settingsCard}>
          <SettingRow
            icon="bell"
            label="Push Notifications"
            value={notifications}
            onChange={setNotifications}
            color={Colors.teal}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="moon"
            label="Dark Mode"
            value={darkMode}
            onChange={setDarkMode}
            color={Colors.violet}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="clock"
            label="Focus Reminders"
            value={focusReminder}
            onChange={setFocusReminder}
            color={Colors.emerald}
          />
        </GlowCard>

        {/* action buttons */}
        <Text style={styles.sectionTitle}>Account</Text>
        <GlowCard style={styles.settingsCard}>
          {[
            { icon: "edit-2", label: "Edit Profile" },
            { icon: "lock", label: "Change Password" },
            { icon: "download", label: "Export Data" },
          ].map((item: any, i: number, arr: any[]) => (
            <React.Fragment key={item.label}>
              <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
                <Feather
                  name={item.icon}
                  size={16}
                  color={Colors.textSecondary}
                />
                <Text style={styles.actionLabel}>{item.label}</Text>
                <Feather
                  name="chevron-right"
                  size={16}
                  color={Colors.textMuted}
                />
              </TouchableOpacity>
              {i < arr.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </GlowCard>

        {/* sign out */}
        <TouchableOpacity style={styles.signOut} activeOpacity={0.8}>
          <Feather name="log-out" size={16} color={Colors.rose} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

interface SettingRowProps {
  icon: string;
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  color: string;
}

// a toggle row inside the settings card
function SettingRow({ icon, label, value, onChange, color }: SettingRowProps) {
  return (
    <View style={styles.settingRow}>
      <View style={[styles.settingIcon, { backgroundColor: `${color}20` }]}>
        <Feather name={icon as any} size={14} color={color} />
      </View>
      <Text style={styles.settingLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: Colors.border, true: `${color}60` }}
        thumbColor={value ? color : Colors.textMuted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: Spacing.md, paddingBottom: 40 },

  profileCard: {
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: "center",
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: `${Colors.teal}25`,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.teal,
  },
  avatarText: { fontSize: Fonts.xxl, fontWeight: "800", color: Colors.teal },
  name: { fontSize: Fonts.xl, fontWeight: "800", color: Colors.textPrimary },
  email: { fontSize: Fonts.sm, color: Colors.textSecondary },
  badge: { fontSize: Fonts.sm, color: Colors.textMuted, marginTop: 4 },

  statsRow: { flexDirection: "row", gap: Spacing.sm, marginBottom: Spacing.lg },
  statCard: { flex: 1 },
  statPad: { padding: Spacing.sm, alignItems: "center" },
  statVal: { fontSize: Fonts.lg, fontWeight: "800" },
  statLbl: { fontSize: Fonts.xs, color: Colors.textMuted },

  section: { marginBottom: Spacing.lg },
  ringPad: { padding: Spacing.md },
  ringRow: { flexDirection: "row", alignItems: "center", gap: Spacing.lg },
  ringInfo: { flex: 1 },
  ringTitle: {
    fontSize: Fonts.md,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  ringDetail: {
    fontSize: Fonts.sm,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },

  sectionTitle: {
    fontSize: Fonts.lg,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },

  settingsCard: { marginBottom: Spacing.lg },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  settingLabel: { flex: 1, fontSize: Fonts.md, color: Colors.textPrimary },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  actionLabel: { flex: 1, fontSize: Fonts.md, color: Colors.textPrimary },

  signOut: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    padding: Spacing.md,
  },
  signOutText: { fontSize: Fonts.md, fontWeight: "700", color: Colors.rose },
});
