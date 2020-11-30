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
          options={{ title: "이전 쇼핑 목록", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            title: "이전 쇼핑 목록 수정하기",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="New"
          component={New}
          options={{
            title: "새 쇼핑 목록 만들기",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Today"
          component={Today}
          options={{
            title: "오늘의 쇼핑 목록",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Favorite"
          component={Favorite}
          options={{ title: "즐겨찾기 쇼핑 목록", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Name"
          component={Name}
          options={{
            title: "쇼핑 목록 이름 정하기",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Manual"
          component={Manual}
          options={{
            title: "사용 설명서",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
