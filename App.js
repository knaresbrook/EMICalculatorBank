import { View, StyleSheet } from "react-native";
import LoanSchedule from "./components/loanschedule";
import AppContext from "./constants/globalvar";
import React, { useState } from "react";

export default function App() {
  const [LoanAmount, setLoanAmount] = useState("");
  const [InterestRate, setInterestRate] = useState("");
  const [Tenure, setTenure] = useState("");
  const [MonthlyEMI, setMonthlyEMI] = useState("");
  const [TotalInterestPayable, setTotalInterestPayable] = useState("");
  const [TotalAmountPayable, setTotalAmountPayable] = useState("");
  const [graphicData, setGraphicData] = useState([]);
  const [label, setLabel] = useState(false);
  const [items, setItems] = useState([]);

  const globalState = {
    LoanAmount,
    InterestRate,
    Tenure,
    MonthlyEMI,
    TotalInterestPayable,
    TotalAmountPayable,
    graphicData,
    label,
    items,
    setLoanAmount,
    setInterestRate,
    setTenure,
    setMonthlyEMI,
    setTotalInterestPayable,
    setTotalAmountPayable,
    setGraphicData,
    setLabel,
    setItems,
  };

  return (
    <AppContext.Provider value={globalState}>
      {/* <ScrollView contentContainerStyle={styles.container}>
        <LoanInput />
        <LoanSummary />
        <LoanChart />
        <LoanSchedule />
      </ScrollView> */}
      <View style={styles.container}>
        <LoanSchedule />
      </View>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    marginTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
});
