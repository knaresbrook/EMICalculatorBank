import { VictoryPie, VictoryLegend, VictoryLabel } from "victory-native";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Svg } from "react-native-svg";
import React, { useContext } from "react";
import AppContext from "../constants/globalvar";
import { useNavigation } from "@react-navigation/native";

export default function LoanChart() {
  const myContext = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <View>
      {myContext.label ? (
        <View style={styles.summarychart}>
          {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Loan Interest & Principle Pay
          </Text> */}

          <Svg width={250} height={280} viewBox="-25 45 365 200">
            <VictoryPie
              standalone={false}
              width={360}
              height={420}
              data={myContext.graphicData}
              innerRadius={35}
              labelRadius={45}
              style={{
                labels: {
                  fontSize: 24,
                  fontWeight: "bold",
                  fill: "white",
                },
              }}
              animate={{
                duration: 1000,
                onLoad: {
                  duration: 1000,
                },
              }}
              colorScale={["green", "darkorange"]}
            />
            <VictoryLegend
              title="Loan Details"
              centerTitle
              orientation="horizontal"
              gutter={20}
              data={[
                { name: "Interest Payable", symbol: { fill: "green" } },
                {
                  name: "Principle Amount",
                  symbol: { fill: "darkorange" },
                },
              ]}
              labelComponent={<VictoryLabel angle={360} />}
            />
          </Svg>
          <TouchableOpacity
            style={[styles.screenButton, styles.inputbutton]}
            onPress={() => navigation.navigate("LoanSchedule")}
          >
            <Text style={styles.buttonText}>Loan Amortization Schedule</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  summarychart: {
    backgroundColor: "white",
    height: 260,
    marginTop: 8,
    paddingLeft: 27,
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
  screenButton: {
    marginRight: 0,
    height: 30,
    marginLeft: 0,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: "darkorange",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
  },
  inputbutton: {
    width: "95%",
    height: "18%",
    alignContent: "center",
  },
});
