import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

Ionicons.loadFont();

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF', // A nice blue color for active tabs
        headerShown: true, // Show the header with the screen title
      }}
    >
      {/* 1. Home/Tracker Tab (Corresponds to index.tsx) */}
      <Tabs.Screen
        name="index" // The file name without the extension (index.tsx)
        options={{
          title: 'Today',
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar-outline" size={24} color={color} />
          ),
          headerTitle: 'Daily Calorie Log',
        }}
      />

      {/* 2. Settings Tab (Corresponds to settings.tsx) */}
      <Tabs.Screen
        name="explore" // The file name without the extension (settings.tsx)
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Ionicons name="options-outline" size={24} color={color} />
          ),
          headerTitle: 'App Settings',
        }}
      />
      
      {/* NOTE: Any other files in app/(tabs) (like modal.tsx) 
        must also be included here or excluded via the 'unstable_settings' property.
      */}

    </Tabs>
  );
}

