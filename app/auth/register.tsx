import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
// FIX: Only import what you need. AuthProvider should NOT be imported here
// because it is already wrapping the entire app in app/_layout.tsx
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const router = useRouter();

  // FIX: This call to useAuth() is now safe because the component is
  // wrapped by AuthProvider in the root layout file.
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    // Basic validation to prevent null password/email/mismatch
    if (!email || !password || password !== confirmPassword) {
      console.error(
        "Validation failed: Check email, password, and confirmation.",
      );
      return;
    }

    try {
      await register(email, password, username || undefined);
      // If registration succeeds, navigate the user to the main tabs screen
      router.replace("/tabs");
    } catch (error) {
      // You should show an error message in the UI here (e.g., using a state variable)
      console.error("Registration failed:", error);
    }
  };

  // The UI is now clean and uses the global AuthProvider wrapper.
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register Account</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username (Optional)"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
  },
});
