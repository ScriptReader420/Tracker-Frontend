// app/(tabs)/index.tsx

import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
// Import the custom hook
import { useCalorieGoal } from '@/constants/CalorieGoalContext';

// Define the type for a food item (remains the same)
interface FoodItem {
  id: number;
  name: string;
  calories: number;
}

export default function HomeScreen() {
  
  const { calorieGoal } = useCalorieGoal(); 
  
  const [foodLog, setFoodLog] = useState<FoodItem[]>([]); 
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [LSG, setLSG] = useState('');
  // ... (rest of the component logic is unchanged)
  const totalCalories = foodLog.reduce((sum, item) => sum + item.calories, 0);
  const remainingCalories = calorieGoal - totalCalories;
  useEffect(() => {
    const fetchGoal = async () => {
      const storedGoal = await localStorage.getItem('@FoodTracker:calorieGoal');
      if (storedGoal) {
        // Assuming you want to update the calorieGoal state here if needed
        // setCalorieGoal(JSON.parse(storedGoal));
        setLSG(storedGoal);
      
      }
    };
    fetchGoal();
  }, []);
  function addFoodItem(): void {
    if (!foodName.trim() || !calories.trim()) return;

    const caloriesNumber = parseInt(calories, 10);
    if (isNaN(caloriesNumber) || caloriesNumber <= 0) return;
    
    const newFood: FoodItem = {
      id: Date.now(),
      name: foodName.trim(),
      calories: caloriesNumber,
    };

    setFoodLog((prev) => [newFood, ...prev]);
    setFoodName('');
    setCalories('');
  }
  // ... (rest of addFoodItem function is unchanged)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Calorie Tracker</Text>

      {/* Calorie Summary now uses the shared calorieGoal */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>Goal: {LSG} kcal</Text>
        <Text style={[styles.summaryText, { color: remainingCalories < 0 ? 'red' : 'green' }]}>
          Remaining: {remainingCalories} kcal
        </Text>
      </View>

      {/* ... (rest of the render function is unchanged) */}
      <TextInput
        style={styles.input}
        placeholder="Food Name (e.g., Apple)"
        value={foodName}
        onChangeText={setFoodName}
      />
      <TextInput
        style={styles.input}
        placeholder="Calories (e.g., 95)"
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
      />
      <Button title="Add to Log" onPress={addFoodItem} />

      {/* Food Log List */}
      <Text style={styles.logHeader}>Food Log</Text>
      <FlatList
        data={foodLog}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text style={styles.logText}>{item.name}</Text>
            <Text style={styles.logText}>{item.calories} kcal</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (styles remain the same)
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  summaryBox: { padding: 15, backgroundColor: '#fff', borderRadius: 8, marginBottom: 20 },
  summaryText: { fontSize: 18, marginBottom: 5 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, backgroundColor: '#fff' },
  logHeader: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  logItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 },
  logText: { fontSize: 16 },
});