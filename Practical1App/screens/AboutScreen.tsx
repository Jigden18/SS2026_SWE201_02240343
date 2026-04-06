import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import type { ScreenProps } from '../App';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = ScreenProps<'About'>;

interface InfoRowProps {
  label: string;
  value: string;
  last?: boolean;
}

function InfoRow({ label, value, last = false }: InfoRowProps): React.JSX.Element {
  return (
    <View style={[styles.row, !last && styles.rowBorder]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}


interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

function SectionCard({ title, children }: SectionCardProps): React.JSX.Element {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

export default function AboutScreen({ navigation }: Props): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>About Me</Text>
          <Text style={styles.headerSub}>Personal profile</Text>
        </View>

        {/* Personal Info */}
        <SectionCard title="PERSONAL INFO">
          <InfoRow label="Name"       value="Jigden Shakya" />
          <InfoRow label="Student ID" value="02240343" />
          <InfoRow label="Year"      value="2" />
          <InfoRow label="Email"      value="jigdenshakya@gmail.com" />
          <InfoRow label="Course"     value="BE Software Engineering" last />
        </SectionCard>

        {/* Skills */}
        <SectionCard title="SKILLS">
          <InfoRow label="Languages"  value="TypeScript, JavaScript" />
          <InfoRow label="Frameworks" value="React Native, Expo" last />
        </SectionCard>

        {/* Interests */}
        <SectionCard title="INTERESTS">
          <InfoRow label="1" value="Web development" />
          <InfoRow label="2" value="UI / UX design" />
          <InfoRow label="3" value="Open source" last />
        </SectionCard>

        {/* Back button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonArrow}>←</Text>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 40,
  },

  // Header
  header: {
    marginBottom: 28,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 32,
  },
  headerSub: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },

  // Section
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1.2,
    marginBottom: 8,
    marginLeft: 2,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },

  // Info row
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  rowBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#F1F5F9',
  },
  rowLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
    maxWidth: '60%',
    textAlign: 'right',
  },

  // Back button
  button: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  buttonArrow: {
    color: '#94A3B8',
    fontSize: 16,
  },
});