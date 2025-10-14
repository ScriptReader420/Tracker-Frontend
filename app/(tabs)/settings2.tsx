import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SettingsScreen() {
  const [newGoal, setNewGoal] = useState('');
  
  // Load the current goal on mount (to pre-fill the input)
  useEffect(() => {
    const loadGoal = async () => {
      const storedGoal = await AsyncStorage.getItem('@FoodTracker:calorieGoal');
      if (storedGoal) setNewGoal(JSON.parse(storedGoal).toString());
    };
    loadGoal();
  }, []);

  const saveGoal = async () => {
    const goalValue = parseInt(newGoal);
    if (!isNaN(goalValue) && goalValue > 500) {
      try {
        // await AsyncStorage.setItem('@FoodTracker:calorieGoal', JSON.stringify(goalValue));
        await localStorage.setItem('@FoodTracker:calorieGoal', JSON.stringify(goalValue));
        console.log('Calorie goal updated to:', goalValue);
        alert('Calorie Goal Updated!');
      } catch (e) {
        alert('Failed to save goal.');
      }
    } else {
      alert('Please enter a valid goal (min 500 kcal).');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Daily Calorie Goal</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new goal (e.g., 2000)"
        value={newGoal}
        onChangeText={setNewGoal}
        keyboardType="numeric"
      />
      <Button title="Save Goal" onPress={saveGoal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  header: { fontSize: 22, marginBottom: 20 },
  input: { width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 },
});