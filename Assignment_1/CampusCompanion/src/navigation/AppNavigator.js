import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ContactsScreen from '../screens/ContactsScreen';
import ContactDetailScreen from '../screens/ContactDetailScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import NoticeBoardScreen from '../screens/NoticeBoardScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const ContactsStack = createStackNavigator();

// Stack sub-navigator for the Contacts tab
function ContactsStackNavigator() {
  return (
    <ContactsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1A3C5E' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <ContactsStack.Screen
        name="ContactsList"
        component={ContactsScreen}
        options={{ title: 'Important Contacts' }}
      />
      <ContactsStack.Screen
        name="ContactDetail"
        component={ContactDetailScreen}
        options={{ title: 'Contact Details' }}
      />
    </ContactsStack.Navigator>
  );
}

// Icon helper so tab bar icons stay consistent
function getTabIcon(routeName, focused, color, size) {
  const icons = {
    Home: focused ? 'home' : 'home-outline',
    Contacts: focused ? 'people' : 'people-outline',
    Schedule: focused ? 'calendar' : 'calendar-outline',
    NoticeBoard: focused ? 'newspaper' : 'newspaper-outline',
    Profile: focused ? 'person-circle' : 'person-circle-outline',
  };
  return <Ionicons name={icons[routeName]} size={size} color={color} />;
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) =>
            getTabIcon(route.name, focused, color, size),
          tabBarActiveTintColor: '#1A3C5E',
          tabBarInactiveTintColor: '#8A9BB0',
          tabBarStyle: { paddingBottom: 4, height: 60 },
          headerStyle: { backgroundColor: '#1A3C5E' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name="Contacts"
          component={ContactsStackNavigator}
          // Hide the default tab header because the stack has its own
          options={{ headerShown: false, title: 'Contacts' }}
        />
        <Tab.Screen
          name="Schedule"
          component={ScheduleScreen}
          options={{ title: 'Schedule' }}
        />
        <Tab.Screen
          name="NoticeBoard"
          component={NoticeBoardScreen}
          options={{ title: 'Notice Board' }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}