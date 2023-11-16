import { Alert, StyleSheet, View, Button } from "react-native";
import LoanSchedule from "./components/loanschedule";
import LoanChart from "./components/loanchart";
import AppContext from "./constants/globalvar";
import React, { useState, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeLoans from "./components/homeloan";
import MainScreen from "./components/mainscreen";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

const Stack = createNativeStackNavigator();

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
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

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
    email,
    status,
    setLoanAmount,
    setInterestRate,
    setTenure,
    setMonthlyEMI,
    setTotalInterestPayable,
    setTotalAmountPayable,
    setGraphicData,
    setLabel,
    setItems,
    setEmail,
    setStatus,
  };

  const sharePDF = async () => {
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
       <h3>Loan Amount (₹): ${Number(LoanAmount).toLocaleString()}</h3>
       </div>
       <div style="text-decoration:underline">
       <h3>Interest Rate: ${InterestRate}%</h3>
       </div>
       <div style="text-decoration:underline">
       <h3>Tenure (Years): ${Tenure}</h3>
       </div>
       <table style="width: 100%; border-collapse: collapse;border: 1px solid;font-size:12px">
                  <tr style="background-color: darkorange;color:black;border: 1px solid">
                    <th>Month</th>
                    <th>Principle(₹)</th>
                    <th>Interest(₹)</th>
                    <th>Total Payment(₹)</th>
                    <th>Balance(₹)</th>
                  </tr>
                  ${items
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

      await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    } catch (error) {
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  };

  return (
    <AppContext.Provider value={globalState}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={MainScreen}
              options={{ title: "EMI Calculator" }}
            />
            <Stack.Screen
              name="HomeLoans"
              component={HomeLoans}
              options={{
                title: "Home Loans",
                headerStyle: {
                  backgroundColor: "darkorange",
                },
                headerTintColor: "black",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                headerRight: () => (
                  <Button
                    onPress={async () => sharePDF()}
                    title="Share PDF"
                    color="black"
                  />
                ),
              }}
            />
            <Stack.Screen
              name="LoanSchedule"
              component={LoanSchedule}
              options={{ title: "Loan Amortization Schedule" }}
            />
            <Stack.Screen name="LoanChart" component={LoanChart} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    marginTop: 0,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
});
