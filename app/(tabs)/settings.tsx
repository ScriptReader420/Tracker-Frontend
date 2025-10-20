import axios from "axios";
import React from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function setCalorieGoal() {
  const [goal, setGoal] = React.useState("");
  const postdata = async () => {
    const posturl = "http://192.168.0.27:8000/api/calorie-goal";
    const data = { goal: goal };
    const headers = { "Content-Type": "application/json" };
    try {
      const response = await axios.post(posturl, data, { headers: headers });

      console.log(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  return (
    <View>
      <Text>Set Calorie Goal:</Text>
      <TextInput value={goal} onChangeText={setGoal} />
      <Button onPress={postdata} title="Set Goal" />
    </View>
  );
}
