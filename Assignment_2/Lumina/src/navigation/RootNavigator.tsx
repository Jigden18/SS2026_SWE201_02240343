import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import SubjectDetailScreen from "../screens/SubjectDetailScreen";

// Define the param list for the stack navigator
export type RootStackParamList = {
  Main: undefined;
  SubjectDetail: { subject: any };
};

const Stack = createStackNavigator<RootStackParamList>();

// the root stack lets us push detail screens over the tab bar
export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen
          name="SubjectDetail"
          component={SubjectDetailScreen}
          options={{
            // card slides up from bottom — feels native and smooth
            cardStyleInterpolator: ({ current, layouts }: any) => ({
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            }),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
