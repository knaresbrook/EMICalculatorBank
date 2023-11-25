import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useEffect } from "react";

export default function MainScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        accessible={true}
        accessibityLabel="This is Home Loan button"
        onPress={() => navigation.navigate("HomeLoans")}
      >
        <Text style={[styles.mscreen]}>Home Loans</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mscreen: {
    ...Platform.select({
      ios: {
        paddingTop: 15,
      },
      android: {
        paddingTop: 1,
      },
    }),
    fontSize: 24,
    fontWeight: "bold",
    verticalAlign: "middle",
    paddingHorizontal: 34,
    width: 212,
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    backgroundColor: "darkorange",
  },
});
