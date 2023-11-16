import {
  Modal,
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import AppContext from "../constants/globalvar";
import { TouchableOpacity } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import * as MailComposer from "expo-mail-composer";

export default function LoanInput() {
  const myContext = useContext(AppContext);
  const [selectedPrinter, setSelectedPrinter] = useState();
  const [modalVisible, setModalVisible] = useState(false);

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

    var intpay = (_TotalInterestPayable / _TotalAmountPayable) * 100;
    var princ = (myContext.LoanAmount / _TotalAmountPayable) * 100;

    myContext.setLabel(true);

    var principle = Number(princ).toFixed(1).toString() + "%";
    var interestpay = Number(intpay).toFixed(1).toString() + "%";

    const wantedGraphicData = [
      { x: interestpay, y: _TotalInterestPayable },
      { x: principle, y: Number(myContext.LoanAmount) },
    ];

    myContext.setGraphicData(wantedGraphicData);

    loanSchedule(_MonthlyEMI);
  };

  const loanSchedule = (_MonthlyEMI) => {
    principleAmt = 0;
    interestAmt = 0;
    loanBalanceAmt = Number(myContext.LoanAmount);
    var currentTime = new Date();

    currentYear = currentTime.getFullYear();
    currentMonth = currentTime.getMonth() + 1;
    numMonths = Number(myContext.Tenure) * 12;
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

    for (x = 1; x <= 1; x++) {
      for (i = currentMonth; i <= currentMonth + 11; i++) {
        var Loan = {};
        firstPrincipalAmt =
          Number(_MonthlyEMI) -
          Number(loanBalanceAmt) * (Number(myContext.InterestRate) / 100 / 12);
        firstInterestAmt =
          (Number(myContext.InterestRate) / 100 / 12) * loanBalanceAmt;
        loanBalanceAmt = loanBalanceAmt - firstPrincipalAmt;
        principleAmt = principleAmt + firstPrincipalAmt;
        interestAmt = interestAmt + firstInterestAmt;

        var date = new Date(currentYear, i - 1, 1);

        Loan["Month"] = monthNames[date.getMonth()];
        Loan["Year"] = currentYear;
        Loan["Principal"] = Math.round(firstPrincipalAmt);
        Loan["Interest"] = Math.round(firstInterestAmt);
        Loan["TotalPayment"] = Math.round(firstPrincipalAmt + firstInterestAmt);
        Loan["Balance"] = Math.round(loanBalanceAmt);
        itemsList.push(Loan);
        countMonths++;

        if (i == 12 && countMonths != numMonths) {
          var Loan = {};
          Loan["Year"] = currentYear;
          Loan["Month"] = currentYear.toString();
          Loan["Principal"] = Math.round(principleAmt);
          Loan["Interest"] = Math.round(interestAmt);
          Loan["TotalPayment"] = Math.round(principleAmt + interestAmt);
          Loan["Balance"] = Math.round(loanBalanceAmt);

          itemsList.push(Loan);
          principleAmt = 0;
          interestAmt = 0;
          i = 0;
          currentYear++;
        }
        if (countMonths == numMonths) break;
      }

      var Loan = {};
      Loan["Year"] = currentYear;
      Loan["Month"] = currentYear.toString();
      Loan["Principal"] = Math.round(principleAmt);
      Loan["Interest"] = Math.round(interestAmt);
      Loan["TotalPayment"] = Math.round(principleAmt + interestAmt);
      Loan["Balance"] = Math.round(loanBalanceAmt);

      itemsList.push(Loan);

      principleAmt = 0;
      interestAmt = 0;
      currentMonth = 1;
      currentYear++;
    }

    myContext.setItems(itemsList);
    myContext.setLabel(true);
  };

  const btnClear = () => {
    myContext.setLoanAmount("");
    myContext.setInterestRate("");
    myContext.setTenure("");
    myContext.setMonthlyEMI("");
    myContext.setTotalAmountPayable("");
    myContext.setTotalInterestPayable("");
    myContext.setGraphicData([]);
    myContext.setLabel(false);
    myContext.setItems([]);
    myContext.setEmail([]);
  };

  async function GeneratePDF(emailAddress) {
    try {
      const html = `    
        <html>
        <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
       <body style="font-family: Helvetica; font-weight: normal; font-size:14px;margin-left:120px;margin-right:120px;">
       <div style="display: flex; justify-content: center; padding: 0 20px;background-color:darkorange;color:white;">
       <h2>Loan Amortization Schedule</h2>
       </div>
       <div style="text-decoration:underline">
       <h3>Loan Amount (₹): ${Number(
         myContext.LoanAmount
       ).toLocaleString()}</h3>
       </div>
       <div style="text-decoration:underline">
       <h3>Interest Rate: ${myContext.InterestRate}%</h3>
       </div>
       <div style="text-decoration:underline">
       <h3>Tenure (Years): ${myContext.Tenure}</h3>
       </div>
       <table style="width: 100%; border-collapse: collapse;border: 1px solid;font-size:12px">
                  <tr style="background-color: darkorange;color:black;border: 1px solid">
                    <th>Month</th>
                    <th>Principle(₹)</th>
                    <th>Interest(₹)</th>
                    <th>Total Payment(₹)</th>
                    <th>Balance(₹)</th>
                  </tr>
                  ${myContext.items
                    .map(
                      (line) => `
                    <tr style="border: 1px solid; border-color: darkorange">
                      <td style="border: 1px solid; border-color: darkorange;text-align:center">${
                        line.Month
                      }</td>
                      <td style="border: 1px solid; border-color: darkorange;text-align:right">${Number(
                        line.Principal
                      ).toLocaleString()}</td>
                      <td style="border: 1px solid; border-color: darkorange;text-align:right">${Number(
                        line.Interest
                      ).toLocaleString()}</td>
                      <td style="border: 1px solid; border-color: darkorange;text-align:right">${Number(
                        line.TotalPayment
                      ).toLocaleString()}</td>
                      <td style="border: 1px solid; border-color: darkorange;text-align:right">${Number(
                        line.Balance
                      ).toLocaleString()}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </table>
                <div style="background-color: darkorange; color: white; display: flex; justify-content: center; padding: 0 20px;">
                  <p>Thank you for your business!</p>
                </div>
              </body>
            </html>
          `;

      const { uri } = await Print.printToFileAsync({
        html: html,
        base64: false,
      });

      sendEmail([uri]);
    } catch (error) {
      Alert.alert("Error", error, [{ text: "OK" }]);
    }
  }

  const sendEmail = async (file, emailAddr) => {
    var options = {};

    options = {
      subject: "Loan Amortization Schedule PDF attachment",
      recipients: [emailAddr],
      body: "Please find attached your EMI Calculation for Home Loan.",
      attachments: file,
    };

    let promise = new Promise((resolve, reject) => {
      MailComposer.composeAsync(options)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
    promise.then(
      (result) => {
        myContext.setStatus("Status: email " + result.status);
        Alert.alert("Info", result.status, [{ text: "OK" }]);
      },
      (error) => {
        myContext.setStatus("Status: email " + error.status);
        Alert.alert("Error", error.status, [{ text: "OK" }]);
      }
    );
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
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
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Email PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.screenButton, styles.inputbutton]}
          onPress={() => btnClear()}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      {Platform.OS === "ios" && (
        <>
          <View style={styles.spacer} />
          <Button title="Select printer" onPress={selectPrinter} />
          <View style={styles.spacer} />
          {selectedPrinter ? (
            <Text
              style={styles.printer}
            >{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </>
      )}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView]}>
              <Text style={styles.modalText}>Email Address</Text>
              <TextInput
                style={[styles.input, styles.inputmore, { width: 265 }]}
                placeholder="Enter Email Address"
                value={myContext.email}
                onChangeText={myContext.setEmail}
              />
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {
                  if (myContext.email == "") {
                    Alert.alert(
                      "Warning",
                      "Please enter your Email Address",
                      "Ok"
                    );
                    setModalVisible(modalVisible);
                  } else {
                    setModalVisible(!modalVisible);
                    GeneratePDF(myContext.email);
                  }
                }}
              >
                <Text style={styles.textStyle}>Ok</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "white",
    padding: 10,
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
    fontSize: 18,
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
    width: "32%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 15,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
});
