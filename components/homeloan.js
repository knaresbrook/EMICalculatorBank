import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";

export default function HomeLoan() {
  btnCalculate = () => {
    const intRate = Number(InterestRate) / 12 / 100;
    const noOfMonths = Number(Tenure) * 12;
    const powerValue = Math.pow(1 + intRate, noOfMonths);

    let _MonthlyEMI =
      (Number(LoanAmount) * intRate * powerValue) / (powerValue - 1);
    let _TotalAmountPayable = _MonthlyEMI * noOfMonths;
    let _TotalInterestPayable = _TotalAmountPayable - Number(LoanAmount);

    setMonthlyEMI(Math.round(_MonthlyEMI).toString());
    setTotalAmountPayable(Math.round(_TotalAmountPayable).toString());
    setTotalInterestPayable(Math.round(_TotalInterestPayable).toString());

    setLabel(true);
    // const wantedGraphicData = [
    //   { x: "Total Interest", y: _TotalInterestPayable },
    //   { x: "Principle", y: Number(LoanAmount) },
    // ];

    const wantedGraphicData = [
      { x: "      80%", y: _TotalInterestPayable },
      { x: "60%     ", y: Number(LoanAmount) },
    ];

    setGraphicData(wantedGraphicData);

    loanSchedule(LoanAmount, Tenure, MonthlyEMI);
  };

  return <SafeAreaView style={styles.container}></SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    marginTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  form: {
    backgroundColor: "white",
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
  inputView: {
    justifyContent: "center",
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 5,
    marginLeft: 5,
    fontWeight: "bold",
  },
  input: {
    marginLeft: 10,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    width: 175,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  screenButton: {
    marginRight: 5,
    height: 50,
    marginLeft: 2,
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: "darkorange",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  summarylabel: {
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 40,
    fontWeight: "bold",
    color: "#b4600d",
  },
  summaryform: {
    backgroundColor: "white",
    marginTop: 10,
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
  summarychart: {
    backgroundColor: "#f5fcff",
    height: 280,
    marginTop: 10,
    paddingLeft: 50,
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
  inputmore: {
    marginLeft: 13,
  },
  inputtenure: {
    marginLeft: 65,
  },
  inputbutton: {
    width: "30%",
  },
});
