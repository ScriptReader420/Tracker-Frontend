import React, { useEffect, useState } from "react"; // 👈 NEW: Import hooks
import {
  Button,
  GestureResponderEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const API_URL = "http://localhost:8000/api/goal/";
const STORAGE_KEY = "userCalorieGoal";

export default function TabOneScreen() {
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [inputGoal, setInputGoal] = useState("");
  const [dailyGoal, setDailyGoal] = useState(0);
  const [foodLog, setFoodLog] = useState<{ name: string; calories: number }[]>(
    [],
  );
  const [foodName, setFoodName] = useState("");
  const [foodCalories, setFoodCalories] = useState("");

  const totalCalories = foodLog.reduce((sum, item) => sum + item.calories, 0);
  const remainingCalories = calorieGoal - totalCalories;
  async function fetchGoal() {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log("Fetch goal response:", response);
      if (response.ok) {
        const data = await response.json();
        const fetchedGoal = data.goal || 0;
        setCalorieGoal(fetchedGoal);
        setInputGoal(String(fetchedGoal));
        console.log("Fetched goal from backend:", fetchedGoal);
        // return response;
        // setDailyGoal(response);
      } else {
        console.error("Failed to fetch goal from the backend.");
      }
    } catch (error) {
      console.error("Network error while setting goal:", error);
    }
  }
  useEffect(() => {
    fetchGoal();
  }, []);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      Platform.OS !== "android" &&
      Platform.OS !== "ios"
    ) {
      const storedGoal = localStorage.getItem(STORAGE_KEY);
      if (storedGoal) {
        const initialGoal = parseInt(storedGoal, 10);
        setCalorieGoal(initialGoal);
        setInputGoal(String(initialGoal));
      }
    }

    const fetchGoal = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Network response not ok");

        const data = await response.json();
        const fetchedGoal = data.goal || 0;

        setCalorieGoal(fetchedGoal);
        setInputGoal(String(fetchedGoal));

        // Update local storage with the latest fetched value
        if (
          typeof window !== "undefined" &&
          Platform.OS !== "android" &&
          Platform.OS !== "ios"
        ) {
          localStorage.setItem(STORAGE_KEY, String(fetchedGoal));
        }
      } catch (error) {
        console.warn(
          "Failed to fetch goal from backend, using local data or default.",
          error,
        );
      }
    };

    fetchGoal();
  }, []);

  const handleSetGoal = async () => {
    const newGoal = parseInt(inputGoal, 10);
    if (isNaN(newGoal) || newGoal <= 0) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: newGoal }),
      });

      if (response.ok) {
        setCalorieGoal(newGoal);

        if (
          typeof window !== "undefined" &&
          Platform.OS !== "android" &&
          Platform.OS !== "ios"
        ) {
          localStorage.setItem(STORAGE_KEY, String(newGoal));
        }
      } else {
        console.error("Failed to update goal on the backend.");
      }
    } catch (error) {
      console.error("Network error while setting goal:", error);
    }
  };

  const handleAddFood = () => {
    const cals = parseInt(foodCalories, 10);
    if (foodName.trim() && cals > 0) {
      setFoodLog([...foodLog, { name: foodName.trim(), calories: cals }]);
      setFoodName("");
      setFoodCalories("");
    }
  };

  const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    appTitle: {
      fontSize: 45,
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: 20,
    },
    headerText: { fontSize: 20, fontWeight: "bold", marginTop: 15 },
    input: {
      height: 40,
      borderColor: "#ccc",
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    logItem: {
      fontSize: 16,
      padding: 5,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
  });
  function postdata(event: GestureResponderEvent): void {
    // ignore the gesture event and delegate to the existing handler
    // handleSetGoal is async but we don't need to await it here
    handleSetGoal();
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.appTitle}>CALORIE TRACKER</Text>
        <Text style={styles.headerText}>Daily Goal</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setInputGoal} // Update state on change
          value={inputGoal}
          placeholder={`Current Goal: ${calorieGoal}`}
        />
        <Button title="Set Goal" onPress={postdata} color="#007AFF" />
        <Text style={styles.headerText}>Summary</Text>
        <Text>Goal: {calorieGoal} cal</Text>
        <Text>Consumed: {totalCalories} cal</Text>
        <Text style={{ fontWeight: "bold" }}>
          Remaining: {remainingCalories} cal
        </Text>
        <Text style={styles.headerText}>Add Food</Text>
        <Text>Food Item</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter food item"
          value={foodName}
          onChangeText={setFoodName}
        />
        <Text>Calories</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter calories"
          value={foodCalories}
          onChangeText={setFoodCalories}
        />
        <Button title="Add Food" onPress={handleAddFood} color="green" />
        <Text style={styles.headerText}>Food Log</Text>
        {foodLog.map((item, index) => (
          <Text key={index} style={styles.logItem}>
            {item.name}: {item.calories} cal
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}
