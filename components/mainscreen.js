import { Button, View } from "react-native";
import React from "react";

export default function MainScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Home Loans"
        onPress={() => navigation.navigate("HomeLoans")}
      />
    </View>
  );
}
