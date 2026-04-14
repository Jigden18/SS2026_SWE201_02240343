import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import ContactCard from '../components/ContactCard';

// Static data – replace with API calls in future assignments
const CONTACTS = [
  {
    id: '1',
    name: 'IT Helpdesk',
    role: 'Technical Support',
    phone: '+975-17774343',
    email: 'ithelpdesk@cst.edu.bt',
    office: 'IT Building, Third Floor',
    icon: 'desktop-outline',
  },
  {
    id: '2',
    name: 'Student Services',
    role: 'Administrative',
    phone: '+975-17-252526',
    email: 'studentservices@cst.edu.bt',
    office: 'Administrative Block, Ground Floor',
    icon: 'people-outline',
  },
  {
    id: '3',
    name: 'Library',
    role: 'Resource Center',
    phone: '+975-17-252527',
    email: 'library@cst.edu.bt',
    office: 'Library Building',
    icon: 'library-outline',
  },
  {
    id: '4',
    name: 'Dean of Student Affairs',
    role: 'Student Affairs',
    phone: '+975-17-252528',
    email: 'deanstudents@cst.edu.bt',
    office: 'Administrative Block, First Floor',
    icon: 'person-outline',
  },
  {
    id: '5',
    name: 'Security Office',
    role: 'Campus Security',
    phone: '+975-77-252529',
    email: 'security@cst.edu.bt',
    office: 'Main Gate',
    icon: 'shield-checkmark-outline',
  },
  {
    id: '6',
    name: 'Health Center',
    role: 'Medical Services',
    phone: '+975-77-252530',
    email: 'health@cst.edu.bt',
    office: 'Architecture Block, Ground Floor',
    icon: 'medkit-outline',
  },
];

export default function ContactsScreen({ navigation }) {
  return (
    <FlatList
      data={CONTACTS}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Tap a contact to view full details.
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <ContactCard
          item={item}
          // Pass the full contact object as a navigation parameter
          onPress={() =>
            navigation.navigate('ContactDetail', { contact: item })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#F4F6FA',
    paddingBottom: 32,
    paddingTop: 8,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 13,
    color: '#6B7A8D',
  },
});