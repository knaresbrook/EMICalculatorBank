import { TouchableOpacity, View, Text } from "react-native";
import React from "react";

export default function MainScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("HomeLoans")}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            verticalAlign: "middle",
            paddingHorizontal: 34,
            width: 207,
            borderWidth: 1,
            borderRadius: 10,
            height: 60,
            backgroundColor: "darkorange",
          }}
        >
          Home Loans
        </Text>
      </TouchableOpacity>

      {/* <Button
        title="Home Loans"
        onPress={() => navigation.navigate("HomeLoans")}
      /> */}
    </View>
  );
}
