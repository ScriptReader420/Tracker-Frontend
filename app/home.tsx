import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// NOTE: I am using a simplified component here for demonstration.
// You should merge the complex state management code you shared earlier
// (like foodLog, handleAddFood, fetchGoal, etc.) back into this file.

export default function CalorieTrackerScreen() {
  const router = useRouter();

  // --- Mock Data for Display ---
  const calorieGoal = 2000;
  const totalCalories = 1250;
  const remainingCalories = calorieGoal - totalCalories;

  const progressPercent = Math.min((totalCalories / calorieGoal) * 100, 100);

  // Function to navigate to the new Details page
  const handleViewDetails = () => {
    // This navigates to the screen defined at app/tabs/details.tsx
    router.push("/tabs/details" as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Daily Calorie Summary</Text>

      {/* Calorie Goal Display */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>Goal: {calorieGoal} cal</Text>
        <Text style={styles.summaryConsumed}>
          Consumed: {totalCalories} cal
        </Text>
        <Text style={styles.summaryRemaining}>
          Remaining: {remainingCalories} cal
        </Text>

        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
          />
        </View>
        <Text style={styles.progressText}>
          {progressPercent.toFixed(0)}% Complete
        </Text>
      </View>

      {/* Button for Navigation (Slide Functionality) */}
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={handleViewDetails}
      >
        <Text style={styles.detailsButtonText}>
          View Food Log & Daily Trends
        </Text>
        <Ionicons name="arrow-forward-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* NOTE: Place your TextInput and Log entry UI here when re-integrating the old code.
       */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  summaryText: {
    fontSize: 18,
    color: "#4B5563",
    marginBottom: 5,
  },
  summaryConsumed: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EF4444", // Red for consumption
    marginVertical: 5,
  },
  summaryRemaining: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#10B981", // Green for remaining
    marginBottom: 15,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 5,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#EF4444",
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    textAlign: "right",
    color: "#6B7280",
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF", // Standard iOS Blue
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  detailsButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 10,
  },
});
