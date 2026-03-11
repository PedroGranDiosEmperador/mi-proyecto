import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="profile" size={24} color="black" />
          ),
        }} 
      />
      <Tabs.Screen 
        name="notifications" 
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="notification" size={24} color="black" />
          ),
        }} 
      />
      <Tabs.Screen 
        name="bookmark" 
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="bookmark" size={24} color="black" />
          ),
        }}
      />

    </Tabs>
  );
}
