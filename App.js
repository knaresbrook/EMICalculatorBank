import { StyleSheet, View, Button } from "react-native";
import LoanSchedule from "./components/loanschedule";
import LoanChart from "./components/loanchart";
import AppContext from "./constants/globalvar";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeLoans from "./components/homeloan";
import MainScreen from "./components/mainscreen";
import { sharePDF } from "./utils/general";

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
  const [isready, setIsReady] = useState(false);

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
    isready,
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
    setIsReady,
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
                    disabled={isready ? false : true}
                    onPress={async () =>
                      sharePDF(LoanAmount, InterestRate, Tenure, items)
                    }
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
