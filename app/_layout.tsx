import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";

// This component is the primary entry point for the entire application.
// It sets up the main navigation stack.
export default function RootLayout() {
  return (
    // Wrap the entire app navigation with AuthProvider so auth state is available app-wide
    <AuthProvider>
      <Stack>
        {/* CRITICAL: This line tells Expo Router to load all routes 
          defined inside the 'tabs' folder. The layout for the tabs 
          (the bottom bar) is defined in app/tabs/_layout.tsx. 
        */}
        <Stack.Screen
          name="tabs"
          options={{
            headerShown: false, // We hide the header here because the tabs layout will control it
          }}
        />

        {/* Add other global routes outside of the tab bar here: */}
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
