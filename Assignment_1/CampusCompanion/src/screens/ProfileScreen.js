import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PROFILE = {
  name: 'Jigden Shakya',
  studentId: '02240343',
  programme: 'BE Software Engineering',
  year: 'Year 2',
  semester: 'Semester 2',
  email: 'student@cst.edu.bt',
  phone: '+975-17-123456',
  hometown: 'Samtse, Bhutan',
  bio: 'Passionate about mobile development and building apps that solve real problems for the Bhutanese community.',
};

const INFO_ROWS = [
  { label: 'Student ID', value: PROFILE.studentId, icon: 'card-outline' },
  { label: 'Programme', value: PROFILE.programme, icon: 'school-outline' },
  { label: 'Year / Semester', value: `${PROFILE.year}, ${PROFILE.semester}`, icon: 'layers-outline' },
  { label: 'Email', value: PROFILE.email, icon: 'mail-outline' },
  { label: 'Phone', value: PROFILE.phone, icon: 'call-outline' },
  { label: 'Hometown', value: PROFILE.hometown, icon: 'location-outline' },
];

export default function ProfileScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Avatar section */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInitials}>JS</Text>
        </View>
        <Text style={styles.name}>{PROFILE.name}</Text>
        <View style={styles.programmeBadge}>
          <Ionicons name="code-slash-outline" size={13} color="#FFFFFF" />
          <Text style={styles.programmeBadgeText}>{PROFILE.programme}</Text>
        </View>
      </View>

      {/* Bio card */}
      <View style={styles.bioCard}>
        <Text style={styles.bioLabel}>About</Text>
        <Text style={styles.bioText}>{PROFILE.bio}</Text>
      </View>

      {/* Info rows card */}
      <View style={styles.infoCard}>
        {INFO_ROWS.map((row, index) => (
          <View
            key={row.label}
            style={[
              styles.row,
              // Dynamic style: no border on the last row
              index < INFO_ROWS.length - 1 && styles.rowBorder,
            ]}
          >
            <View style={styles.iconWrapper}>
              <Ionicons name={row.icon} size={18} color="#1A3C5E" />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={styles.rowValue}>{row.value}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* College tag */}
      <Text style={styles.collegeTag}>
        College of Science and Technology, Rinchending
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  content: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  avatarSection: {
    backgroundColor: '#1A3C5E',
    width: '100%',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarInitials: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A3C5E',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  programmeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
    gap: 6,
  },
  programmeBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  bioCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginTop: 20,
    width: Math.min(width - 32, 500),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  bioLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8A9BB0',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  bioText: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 22,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 18,
    marginTop: 14,
    width: Math.min(width - 32, 500),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF2',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF3FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  rowText: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8A9BB0',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A3C5E',
    marginTop: 2,
  },
  collegeTag: {
    marginTop: 24,
    fontSize: 11,
    color: '#AAB4C4',
    textAlign: 'center',
  },
});