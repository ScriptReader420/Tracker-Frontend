
import { StyleSheet, Text, View } from 'react-native';


export default function TabOneScreen() {
  const goal = localStorage.getItem("key");
  const foodLog = [];
  const totalCalories = 0;
  const remainingCalories = goal - totalCalories;
  const styles = StyleSheet.create({
 
  


   
    appTitle: {
      fontSize: 45,
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 20,
    },
   
  });

  return (
    <View style={styles.container}>
     
      <Text style={styles.appTitle}>CALORIE TRACKER {"\n"}{'\n'}</Text>
      
      
      
      <Text style={styles.headerText}>Daily Goal {'\n'}{'\n'}</Text>
      <input type="number" value={goal} />
      <input type="submit" value="Set Goal" />
      <Text>{'\n'}{'\n'}</Text>
      
      
      <Text>Food Item</Text>
      <input type="text" placeholder="Enter food item" />
      <Text>Calories</Text>
      <input type="number" placeholder="Enter calories" />
      <input type="submit" value="Add Food" />
      <Text>{'\n'}{'\n'}</Text>
    
    </View>
  );
}
