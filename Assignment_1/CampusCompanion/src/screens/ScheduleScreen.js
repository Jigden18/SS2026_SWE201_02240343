import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DAYS = [
  { key: 'Mon', label: 'Mon', full: 'Monday' },
  { key: 'Tue', label: 'Tue', full: 'Tuesday' },
  { key: 'Wed', label: 'Wed', full: 'Wednesday' },
  { key: 'Thu', label: 'Thu', full: 'Thursday' },
  { key: 'Fri', label: 'Fri', full: 'Friday' },
];

// type: 'lecture' | 'practical' | 'exam' | 'tutorial'
const TIMETABLE = {
  Mon: [
    { time: '08:00 - 09:50', subject: 'Cross Platform Dev', room: 'Lab 3', type: 'practical' },
    { time: '10:00 - 11:50', subject: 'Operating Systems', room: 'LH 2', type: 'lecture' },
    { time: '13:00 - 14:50', subject: 'Continuous Integration and Continuous Deployment', room: 'LH 1', type: 'lecture' },
  ],
  Tue: [
    { time: '08:00 - 09:50', subject: 'System Design and Solution Architecture', room: 'LH 4', type: 'lecture' },
    { time: '10:00 - 11:50', subject: 'Cross Platform Dev', room: 'Lab 3', type: 'practical' },
  ],
  Wed: [
    { time: '08:00 - 09:50', subject: 'Data Structures', room: 'LH 2', type: 'tutorial' },
    { time: '13:00 - 14:50', subject: 'Algorithm Analysis', room: 'LH 1', type: 'lecture' },
    { time: '15:00 - 16:50', subject: 'Technical Writing', room: 'LH 3', type: 'lecture' },
  ],
  Thu: [
    { time: '08:00 - 09:50', subject: 'Database Systems', room: 'Lab 1', type: 'practical' },
    { time: '10:00 - 11:50', subject: 'Software Engineering', room: 'LH 4', type: 'tutorial' },
  ],
  Fri: [
    { time: '10:00 - 11:50', subject: 'Cryptology', room: 'LH 1', type: 'exam' },
    { time: '13:00 - 14:50', subject: 'Programming Fundamentals', room: 'LH 3', type: 'lecture' },
  ],
};

// Each event type gets its own icon, label, and badge color
const TYPE_META = {
  lecture:   { label: 'Lecture',   icon: 'book-outline',          color: '#1565C0', bg: '#E3F0FF' },
  practical: { label: 'Practical', icon: 'construct-outline',     color: '#2E7D32', bg: '#E8F5E9' },
  exam:      { label: 'Exam',      icon: 'document-text-outline', color: '#C62828', bg: '#FFEBEE' },
  tutorial:  { label: 'Tutorial',  icon: 'chatbubbles-outline',   color: '#6A1B9A', bg: '#F3E5F5' },
};

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState('Mon');
  const classes = TIMETABLE[selectedDay];
  const selectedFull = DAYS.find((d) => d.key === selectedDay).full;

  return (
    <View style={styles.container}>

      {/* Day selector – fixed row, equal width tabs, no wrapping */}
      <View style={styles.dayBarWrapper}>
        {DAYS.map((day) => {
          const active = selectedDay === day.key;
          return (
            <TouchableOpacity
              key={day.key}
              style={[styles.dayTab, active && styles.dayTabActive]}
              onPress={() => setSelectedDay(day.key)}
              activeOpacity={0.75}
            >
              <Text style={[styles.dayText, active && styles.dayTextActive]}>
                {day.label}
              </Text>
              {/* Dot indicator under the active day */}
              {active && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Day heading */}
      <View style={styles.dayHeading}>
        <Ionicons name="calendar-outline" size={16} color="#8A9BB0" />
        <Text style={styles.dayHeadingText}>
          {selectedFull} — {classes.length} class{classes.length !== 1 ? 'es' : ''}
        </Text>
      </View>

      {/* Class cards */}
      <ScrollView contentContainerStyle={styles.classList}>
        {classes.length === 0 ? (
          <View style={styles.emptyWrapper}>
            <Ionicons name="cafe-outline" size={40} color="#C5CDD8" />
            <Text style={styles.noClass}>No classes scheduled.</Text>
          </View>
        ) : (
          classes.map((cls, index) => {
            const meta = TYPE_META[cls.type] ?? TYPE_META.lecture;
            return (
              <View
                key={index}
                style={[styles.classCard, { borderLeftColor: '#1A3C5E' }]}
              >
                <View style={styles.cardTopRow}>
                  <View style={styles.timeRow}>
                    <Ionicons name="time-outline" size={13} color="#8A9BB0" />
                    <Text style={styles.classTime}>{cls.time}</Text>
                  </View>
                  <View style={styles.typeBadge}>
                    <Ionicons name={meta.icon} size={12} color="#1A3C5E" />
                    <Text style={styles.typeLabel}>{meta.label}</Text>
                  </View>
                </View>

                <Text style={styles.classSubject}>{cls.subject}</Text>

                <View style={styles.roomRow}>
                  <Ionicons name="location-outline" size={13} color="#8A9BB0" />
                  <Text style={styles.roomValue}>{cls.room}</Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },

  // Day selector – single fixed row across full width
  dayBarWrapper: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF2',
  },
  dayTab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 12,
  },
  dayTabActive: {
    // No background fill – the dot and bold text signal selection
  },
  dayText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8A9BB0',
  },
  dayTextActive: {
    color: '#1A3C5E',
    fontWeight: '800',
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#1A3C5E',
    marginTop: 5,
  },

  // Date heading below the tab bar
  dayHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dayHeadingText: {
    fontSize: 13,
    color: '#8A9BB0',
    fontWeight: '500',
  },

  // Class list
  classList: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },
  classCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  classTime: {
    fontSize: 12,
    color: '#8A9BB0',
    fontWeight: '600',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
    backgroundColor: '#E8EEF5', 
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A3C5E', 
  },
  classSubject: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A3C5E',
    marginBottom: 8,
  },
  roomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  roomValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7A8D',
  },

  // Empty state
  emptyWrapper: {
    alignItems: 'center',
    marginTop: 60,
    gap: 12,
  },
  noClass: {
    textAlign: 'center',
    color: '#8A9BB0',
    fontSize: 15,
  },
});