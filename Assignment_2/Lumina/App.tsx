import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./src/navigation/RootNavigator";

const App: React.FC = () => {
  return (
    <>
      <StatusBar style="light" />
      <RootNavigator />
    </>
  );
};

export default App;
