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

export default function ContactDetailScreen({ route }) {
  // Destructure the parameter passed from ContactsScreen
  const { contact } = route.params;

  const rows = [
    { label: 'Phone', value: contact.phone, icon: 'call-outline' },
    { label: 'Email', value: contact.email, icon: 'mail-outline' },
    { label: 'Office', value: contact.office, icon: 'location-outline' },
    { label: 'Role', value: contact.role, icon: 'briefcase-outline' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Avatar circle */}
      <View style={styles.avatarWrapper}>
        <Ionicons name={contact.icon} size={48} color="#FFFFFF" />
      </View>

      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.role}>{contact.role}</Text>

      <View style={styles.card}>
        {rows.map((row, index) => (
          <View
            key={row.label}
            style={[
              styles.row,
              // Dynamic style: no border on the last row
              index < rows.length - 1 && styles.rowBorder,
            ]}
          >
            <Ionicons
              name={row.icon}
              size={20}
              color="#1A3C5E"
              style={styles.rowIcon}
            />
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={styles.rowValue}>{row.value}</Text>
            </View>
          </View>
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
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#1A3C5E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A3C5E',
  },
  role: {
    fontSize: 14,
    color: '#6B7A8D',
    marginTop: 4,
    marginBottom: 28,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    // Use Dimensions-derived max width so it doesn't stretch on tablets
    maxWidth: Math.min(width - 40, 480),
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF2',
  },
  rowIcon: {
    marginRight: 14,
    width: 24,
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
    fontSize: 15,
    color: '#1A3C5E',
    marginTop: 2,
  },
});