import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import AppContext from "../constants/globalvar";

export default function LoanSummary() {
  const myContext = useContext(AppContext);

  return (
    <View>
      {myContext.label ? (
        <View style={styles.summaryform}>
          <Text style={styles.summarylabel}>
            Monthly EMI (₹) : {Number(myContext.MonthlyEMI).toLocaleString()}
          </Text>
          <Text style={styles.summarylabel}>
            Total Interest (₹) :{" "}
            {Number(myContext.TotalInterestPayable).toLocaleString()}
          </Text>
          <Text style={styles.summarylabel}>
            Total Amount (₹) :{" "}
            {Number(myContext.TotalAmountPayable).toLocaleString()}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  summarylabel: {
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 40,
    fontWeight: "bold",
    color: "#b4600d",
  },
  summaryform: {
    backgroundColor: "white",
    marginTop: 7,
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
