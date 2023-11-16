import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import LoanInput from "./loaninput";
import LoanSummary from "./loansummary";
import LoanChart from "./loanchart";

export default function HomeLoans() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <LoanInput />
        <LoanSummary />
        <LoanChart />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "start",
    marginTop: 5,
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
