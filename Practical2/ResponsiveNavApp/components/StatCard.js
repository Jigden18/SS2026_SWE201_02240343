import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * StatCard – displays a single metric with a vector icon, value, and label.
 *
 * Props:
 *   iconName    – Ionicons icon name string, e.g. "folder-open-outline"
 *   value       – the main number/text to display
 *   label       – small description below the value
 *   isWide      – boolean: true when screen width >= 600
 *   screenWidth – raw width from useWindowDimensions (for sizing)
 */
export default function StatCard({ iconName, value, label, isWide, screenWidth }) {
  // Narrow: show as horizontal scroll cards (fixed width)
  // Wide: show as 4-column grid (fill available space)
  const cardWidth = isWide ? (screenWidth - 32 - 36) / 4 : 130;

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <View style={styles.iconWrap}>
        <Ionicons name={iconName} size={22} color="#6366f1" />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  value: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 2,
  },
  label: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});