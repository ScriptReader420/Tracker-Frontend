

import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Define the shape of the Context data
interface CalorieGoalContextType {
  calorieGoal: number;
  setCalorieGoal: (goal: number) => void;
}

// 2. Create the Context with a default (initial) value
const CalorieGoalContext = createContext<CalorieGoalContextType | undefined>(undefined);

// 3. Create the Provider component
export const CalorieGoalProvider = ({ children }: { children: ReactNode }) => {
  // Use a sensible default goal state
  const [calorieGoal, setCalorieGoal] = useState(2000);

  return (
    <CalorieGoalContext.Provider value={{ calorieGoal, setCalorieGoal }}>
      {children}
    </CalorieGoalContext.Provider>
  );
};

// 4. Create a custom hook for easy access
export const useCalorieGoal = () => {
  const context = useContext(CalorieGoalContext);
  if (context === undefined) {
    throw new Error('useCalorieGoal must be used within a CalorieGoalProvider');
  }
  return context;
};