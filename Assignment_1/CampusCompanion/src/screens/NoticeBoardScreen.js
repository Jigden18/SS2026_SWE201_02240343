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

const NOTICES = [
  {
    id: '1',
    title: 'End-Semester Examination Schedule',
    date: '10 April 2026',
    body:
      'The end-semester examination timetable has been released. Please check your student portal for your individual schedule. All students must carry their college ID to the examination hall.',
    type: 'exam',
    icon: 'document-text-outline',
  },
  {
    id: '2',
    title: 'Library Hours – Extended',
    date: '8 April 2026',
    body:
      'The library will remain open until 10:00 PM from 12 April to 30 April to support students during the examination period. Silent zones will be strictly enforced.',
    type: 'info',
    icon: 'library-outline',
  },
  {
    id: '3',
    title: 'Wi-Fi Maintenance on 15 April',
    date: '7 April 2026',
    body:
      'Campus-wide Wi-Fi will be unavailable from 06:00 AM to 09:00 AM on 15 April 2026 due to scheduled maintenance. Plan accordingly.',
    type: 'warning',
    icon: 'wifi-outline',
  },
  {
    id: '4',
    title: 'Cultural Festival – Volunteer Sign-Up',
    date: '5 April 2026',
    body:
      'The Annual Cultural Festival is scheduled for 25 April 2026. Interested students can sign up as volunteers at the Student Services office by 18 April.',
    type: 'event',
    icon: 'star-outline',
  },
];

// Badge colour based on notice type
const TYPE_COLORS = {
  exam: '#C62828',
  info: '#1A3C5E',
  warning: '#E65100',
  event: '#2E7D32',
};

export default function NoticeBoardScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.pageSubtitle}>
        Stay updated with the latest college announcements.
      </Text>

      {NOTICES.map((notice) => (
        <View key={notice.id} style={styles.card}>
          {/* Top row: icon + date */}
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.typeBadge,
                { backgroundColor: TYPE_COLORS[notice.type] },
              ]}
            >
              <Ionicons name={notice.icon} size={14} color="#FFFFFF" />
              <Text style={styles.typeText}>
                {notice.type.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.date}>{notice.date}</Text>
          </View>

          <Text style={styles.title}>{notice.title}</Text>
          <Text style={styles.body}>{notice.body}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 14,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#6B7A8D',
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    // Cap width on large screens
    maxWidth: Math.min(width - 32, 600),
    alignSelf: 'stretch',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 11,
    color: '#8A9BB0',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A3C5E',
    marginBottom: 8,
  },
  body: {
    fontSize: 13,
    color: '#4A5568',
    lineHeight: 20,
  },
});