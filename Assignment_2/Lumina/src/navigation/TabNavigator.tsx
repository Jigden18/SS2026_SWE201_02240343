import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import SubjectsScreen from "../screens/SubjectScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AnimationDemoScreen from "../screens/AnimationDemoScreen";

import TabButton from "../components/TabButton";
import { Colors, Fonts } from "../data/theme";

const Tab = createBottomTabNavigator();

const tabs = [
  { name: "Home", component: HomeScreen, icon: "home" },
  { name: "Subjects", component: SubjectsScreen, icon: "grid" },
  { name: "Animations", component: AnimationDemoScreen, icon: "zap" },
  { name: "Profile", component: ProfileScreen, icon: "user" },
];

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      {tabs.map((t) => (
        <Tab.Screen key={t.name} name={t.name} component={t.component} />
      ))}
    </Tab.Navigator>
  );
}

// custom tab bar so we can style it properly
function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.bar}>
      {state.routes.map((route: any, index: number) => {
        const focused = state.index === index;
        const tab = tabs.find((t) => t.name === route.name);
        const color = focused ? Colors.teal : Colors.textMuted;

        return (
          <TabButton
            key={route.key}
            focused={focused}
            onPress={() => navigation.navigate(route.name)}
          >
            <Feather name={tab?.icon as any} size={20} color={color} />
            <Text style={[styles.label, { color }]}>{route.name}</Text>
          </TabButton>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: Colors.bgCard,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: 20,
    paddingTop: 10,
  },
  label: {
    fontSize: Fonts.xs,
    marginTop: 3,
    fontWeight: "500",
  },
});
