import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dimensions API – used to make cards responsive
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.44; // two cards per row with a gap

const QUICK_LINKS = [
  { label: 'Contacts', tab: 'Contacts', icon: 'people-outline' },
  { label: 'Schedule', tab: 'Schedule', icon: 'calendar-outline' },
  { label: 'Notice Board', tab: 'NoticeBoard', icon: 'newspaper-outline' },
  { label: 'My Profile', tab: 'Profile', icon: 'person-circle-outline' },
];

const MAP_LINKS = [
  { id: '1', title: 'Main Campus Overview', icon: 'map-outline', url: 'https://maps.app.goo.gl/ficrqxXx6rz7hWBR6' },
  { id: '2', title: 'Architecture Building', icon: 'school-outline', url: 'https://maps.app.goo.gl/HzPwbrarPwgbVPBx8' },
  { id: '3', title: 'Library', icon: 'library-outline', url: 'https://maps.app.goo.gl/utZBMMqvZqLtXoWd9' },
  { id: '4', title: 'Helipad', icon: 'airplane-outline', url: 'https://maps.app.goo.gl/G1vtTmZKRz2tdz446' },
  { id: '5', title: 'Administrative Block', icon: 'business-outline', url: 'https://maps.app.goo.gl/QujSmicc87qU8ZDx5' },
];

function openLink(url) {
  Linking.openURL(url).catch(() => {});
}

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Header banner */}
      <View style={styles.banner}>
        <Ionicons name="school-outline" size={48} color="#FFFFFF" />
        <Text style={styles.appTitle}>Campus Companion</Text>
        <Text style={styles.collegeName}>
          College of Science and Technology
        </Text>
        <Text style={styles.subText}>Rinchending, Phuentsholing</Text>
      </View>

      {/* Quick access cards */}
      <Text style={styles.sectionTitle}>Quick Access</Text>
      <View style={styles.grid}>
        {QUICK_LINKS.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.card, { width: CARD_WIDTH }]}
            activeOpacity={0.75}
            onPress={() => item.tab && navigation.navigate(item.tab)}
          >
            <Ionicons name={item.icon} size={32} color="#1A3C5E" />
            <Text style={styles.cardLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Campus Map section */}
      <Text style={styles.sectionTitle}>Campus Map</Text>
      <View style={styles.mapSection}>
        {MAP_LINKS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.mapCard}
            activeOpacity={0.75}
            onPress={() => openLink(item.url)}
          >
            <View style={styles.mapIconWrapper}>
              <Ionicons name={item.icon} size={20} color="#1A3C5E" />
            </View>
            <Text style={styles.mapLabel} numberOfLines={1}>
              {item.title}
            </Text>
            <Ionicons name="open-outline" size={18} color="#1A3C5E" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  content: {
    paddingBottom: 32,
  },
  banner: {
    backgroundColor: '#1A3C5E',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 36,
    paddingHorizontal: 24,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 12,
    letterSpacing: 0.5,
  },
  collegeName: {
    fontSize: 14,
    color: '#B0C8E8',
    marginTop: 6,
    textAlign: 'center',
  },
  subText: {
    fontSize: 12,
    color: '#8AAAC8',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A3C5E',
    marginTop: 28,
    marginBottom: 12,
    marginHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingHorizontal: 12,
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
    // Shadow – iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    // Elevation – Android
    elevation: 3,
  },
  cardLabel: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
    color: '#1A3C5E',
  },
  mapSection: {
    paddingHorizontal: 16,
    gap: 10,
  },
  mapCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  mapIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E8EEF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1A3C5E',
  },
});