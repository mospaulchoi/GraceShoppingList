import React from "react";
import Home from "./screen/Home";
import Old from "./screen/Old";
import Edit from "./screen/Edit";
import New from "./screen/New";
import Today from "./screen/Today";
import Favorite from "./screen/Favorite";
import Name from "./screen/Name";
import Manual from "./screen/Manual";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Localized, init } from "./i18n/Localized";

init();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Home}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Old"
          component={Old}
          options={{ title: Localized("006"), headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            title: Localized("013"),
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="New"
          component={New}
          options={{
            title: Localized("007"),
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Today"
          component={Today}
          options={{
            title: Localized("004"),
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Favorite"
          component={Favorite}
          options={{ title: Localized("005"), headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Name"
          component={Name}
          options={{
            title: Localized("014"),
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Manual"
          component={Manual}
          options={{
            title: Localized("008"),
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
