import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useContext } from "react";
import AppContext from "../constants/globalvar";
import { TouchableOpacity } from "react-native";

export default function LoanInput() {
  const myContext = useContext(AppContext);

  const btnCalculate = () => {
    const intRate = Number(myContext.InterestRate) / 12 / 100;
    const noOfMonths = Number(myContext.Tenure) * 12;
    const powerValue = Math.pow(1 + intRate, noOfMonths);

    let _MonthlyEMI =
      (Number(myContext.LoanAmount) * intRate * powerValue) / (powerValue - 1);
    let _TotalAmountPayable = _MonthlyEMI * noOfMonths;
    let _TotalInterestPayable =
      _TotalAmountPayable - Number(myContext.LoanAmount);

    myContext.setMonthlyEMI(Math.round(_MonthlyEMI).toString());
    myContext.setTotalAmountPayable(Math.round(_TotalAmountPayable).toString());
    myContext.setTotalInterestPayable(
      Math.round(_TotalInterestPayable).toString()
    );

    myContext.setLabel(true);
    // const wantedGraphicData = [
    //   { x: "Total Interest", y: _TotalInterestPayable },
    //   { x: "Principle", y: Number(LoanAmount) },
    // ];

    const wantedGraphicData = [
      { x: "      80%", y: _TotalInterestPayable },
      { x: "60%     ", y: Number(myContext.LoanAmount) },
    ];

    myContext.setGraphicData(wantedGraphicData);

    loanSchedule(myContext.LoanAmount, myContext.Tenure, myContext.MonthlyEMI);
  };

  const loanSchedule = (LoanAmount, Tenure, MonthlyEMI) => {
    principleAmt = 0.0;
    interestAmt = 0.0;
    loanBalanceAmt = LoanAmount;

    var currentTime = new Date();

    currentYear = currentTime.getFullYear();
    currentMonth = currentTime.getMonth();
    numMonths = 0;
    numMonths = Tenure * 12 - 1;
    countMonths = 0;
    cMths = 0;

    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    var itemsList = [];
    myContext.setItems([]);

    for (x = 1; x <= 1; x++) {
      for (i = currentMonth; i <= currentMonth + 9; i++) {
        cMths = i;
        var Loan = {};
        firstPrincipalAmt =
          MonthlyEMI - loanBalanceAmt * (myContext.InterestRate / 100 / 12);
        firstInterestAmt = (myContext.InterestRate / 100 / 12) * loanBalanceAmt;
        loanBalanceAmt = loanBalanceAmt - firstPrincipalAmt;
        principleAmt = principleAmt + firstPrincipalAmt;
        interestAmt = interestAmt + firstInterestAmt;

        var date = new Date(currentYear, cMths, 1);

        Loan["Month"] = monthNames[date.getMonth()];
        Loan["Year"] = currentYear;
        Loan["Principal"] = Math.round(firstPrincipalAmt);
        Loan["Interest"] = Math.round(firstInterestAmt);
        Loan["TotalPayment"] = Math.round(firstPrincipalAmt + firstInterestAmt);
        Loan["Balance"] = Math.round(loanBalanceAmt);
        itemsList.push(Loan);
        countMonths++;

        if (i == 11 && countMonths != numMonths) {
          var lns = {};
          lns["Year"] = currentYear;
          lns["Month"] = currentYear.toString();
          lns["Principal"] = Math.round(principleAmt);
          lns["Interest"] = Math.round(interestAmt);
          lns["TotalPayment"] = Math.round(principleAmt + interestAmt);
          lns["Balance"] = Math.round(loanBalanceAmt);

          itemsList.push(lns);

          principleAmt = 0.0;
          interestAmt = 0.0;
          i = 0;
          currentYear++;
        }
        if (countMonths == numMonths) break;
      }

      var ln = {};
      ln["Year"] = currentYear;
      ln["Month"] = currentYear.toString();
      ln["Principal"] = Math.round(principleAmt);
      ln["Interest"] = Math.round(interestAmt);
      ln["TotalPayment"] = Math.round(principleAmt + interestAmt);
      ln["Balance"] = Math.round(loanBalanceAmt);

      itemsList.push(ln);

      principleAmt = 0.0;
      interestAmt = 0.0;
      currentMonth = 1;
      currentYear++;
    }
    myContext.setItems(itemsList);
    myContext.setLabel(true);
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputView}>
        <Text style={styles.label}> Loan Amt (₹) : </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Loan Amount"
          keyboardType="numeric"
          value={myContext.LoanAmount}
          onChangeText={myContext.setLoanAmount}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.label}>Interest Rate : </Text>
        <TextInput
          style={[styles.input, styles.inputmore]}
          placeholder="Enter Interest Rate %"
          keyboardType="numeric"
          value={myContext.InterestRate}
          onChangeText={myContext.setInterestRate}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.label}>Tenure:</Text>
        <TextInput
          style={[styles.input, styles.inputtenure]}
          placeholder="Enter Tenure (Yr/Mth)"
          keyboardType="numeric"
          value={myContext.Tenure}
          onChangeText={myContext.setTenure}
        />
      </View>
      <View style={styles.inputView}>
        <TouchableOpacity
          style={[styles.screenButton, styles.inputbutton]}
          disabled={
            myContext.LoanAmount && myContext.InterestRate && myContext.Tenure
              ? false
              : true
          }
          onPress={() => btnCalculate()}
        >
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.screenButton, styles.inputbutton]}
          onPress={() => btnCalculate}
        >
          <Text style={styles.buttonText}>Email PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.screenButton, styles.inputbutton]}
          onPress={() => btnCalculate}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
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
