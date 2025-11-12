// app/(tabs)/_layout.tsx

import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
// Import the new Provider
import { CalorieGoalProvider } from "@/constants/CalorieGoalContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    // Wrap the entire Tabs navigator with the CalorieGoalProvider
    <CalorieGoalProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Tracker",
            tabBarIcon: ({ color }) => (
              <IconSymbol
                size={28}
                name="list.bullet.clipboard.fill"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="gearshape.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </CalorieGoalProvider>
  );
}
