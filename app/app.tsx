import { useState } from 'react';
import { Text, } from 'react-native';
import {  
  View,           // Required for grouping/layout
  StyleSheet      // Required for styling
} from 'react-native';


export default function Index() {
  const [goal, setGoal] = useState(2000); // Default goal
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [foodLog, setFoodLog] = useState<{ id: number; name: string; calories: number }[]>([]);
  const totalCalories = foodLog.reduce((sum, item) => sum + item.calories, 0);
  const remainingCalories = goal - totalCalories; 
  
return (  
  <>
    {/* Adds one empty line */}
    <Text >CALORIE TRACKER {"\n"}{'\n'}{'\n'}</Text>
       
    {/* Adds two empty lines */}  
    <Text>Daily Goal {'\n'}</Text>
    
    <Text>Remaining</Text>
   
    
  <Text>Food Log</Text>
    
 
  </>
  
);
}



