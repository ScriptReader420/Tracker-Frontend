

import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Alert } from 'react-native';

// Import the custom hook
import { useCalorieGoal } from '@/constants/CalorieGoalContext'; 

// ... (other imports)
import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';


export default function TabTwoScreen() {
  // ✅ USE the shared context hook:
  const { calorieGoal, setCalorieGoal } = useCalorieGoal(); 
  
  // Initialize input state with the current shared goal
  const [newGoalInput, setNewGoalInput] = useState(calorieGoal.toString());

  const handleGoalUpdate = () => {
    const newGoalValue = parseInt(newGoalInput);
    if (!isNaN(newGoalValue) && newGoalValue > 500) {
      // ✅ UPDATE the shared context state:
      setCalorieGoal(newGoalValue);
      Alert.alert('Success', `Daily calorie goal updated to ${newGoalValue} kcal on all screens.`);
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid calorie goal (must be a number greater than 500).');
      // Reset the input field to the valid current goal
      setNewGoalInput(calorieGoal.toString()); 
    }
  };

  // Ensure the input field reflects the current shared goal if it changes elsewhere
  // (though in this two-screen app, it should only change here).
  React.useEffect(() => {
    setNewGoalInput(calorieGoal.toString());
  }, [calorieGoal]);


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="gearshape.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{ fontFamily: Fonts.rounded }}>
          Settings & Goals
        </ThemedText>
      </ThemedView>
      <ThemedText>Manage your tracking settings and find helpful resources.</ThemedText>

      {/* Goal Setting Section now uses the shared calorieGoal */}
      <Collapsible title={`Daily Goal: ${calorieGoal} kcal`}>
        <ThemedText style={{ marginBottom: 10 }}>
          Set your daily target for calorie consumption.
        </ThemedText>
        <ThemedView style={styles.goalInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Calorie Goal"
            value={newGoalInput}
            onChangeText={setNewGoalInput}
            keyboardType="numeric"
          />
          <Button title="Save Goal" onPress={handleGoalUpdate} />
        </ThemedView>
      </Collapsible>

      {/* ... (rest of the component) */}
      <Collapsible title="Nutrition Resources">
        {/* ... */}
      </Collapsible>
    </ParallaxScrollView>
  );
}

// ... (styles remain the same)
const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  goalInputContainer: {
    padding: 10,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});