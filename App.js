import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import LoanSchedule from "./components/loanschedule";
import LoanChart from "./components/loanchart";
import AppContext from "./constants/globalvar";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import HomeLoans from "./components/homeloan";
import MainScreen from "./components/mainscreen";
import { sharePDF } from "./utils/general";

const Stack = createNativeStackNavigator();

export default function App() {
  const navigationRef = useNavigationContainerRef();

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
        <NavigationContainer ref={navigationRef}>
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
                  <TouchableOpacity
                    disabled={isready ? false : true}
                    onPress={
                      () => navigationRef.navigate("LoanSchedule")
                      // sharePDF(LoanAmount, InterestRate, Tenure, items)
                    }
                    style={{
                      backgroundColor: "transparent",
                      paddingLeft: 15,
                    }}
                  >
                    <Text style={styles.labeltext}>Loan Schedule</Text>
                  </TouchableOpacity>
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
    backgroundColor: "white",
  },
  labeltext: {
    ...Platform.select({
      ios: {
        paddingTop: 5,
        height: 40,
        width: 159,
      },
      android: {
        paddingTop: 10,
        height: 48,
        width: 148,
      },
    }),
    fontSize: 17,
    fontWeight: "bold",
    paddingHorizontal: 17,
    backgroundColor: "yellow",
    borderWidth: 3,
    borderRadius: 10,
  },
});
