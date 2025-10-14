import { useState } from 'react';
import { Text } from 'react-native';

export default function Index() {
  const [goal, setGoal] = useState(2000); // Default goal
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [foodLog, setFoodLog] = useState<{ id: number; name: string; calories: number }[]>([]);
  const totalCalories = foodLog.reduce((sum, item) => sum + item.calories, 0);
  const remainingCalories = goal - totalCalories; 
  
return (  
  <>
    <Text>CALORIE TRACKER {}</Text>
    <Text>Daily Goal</Text>
  </>
);
}



