import { VictoryPie, VictoryLegend, VictoryLabel } from "victory-native";
import { StyleSheet, View, Text } from "react-native";
import { Svg } from "react-native-svg";
import React, { useContext } from "react";
import AppContext from "../constants/globalvar";

export default function LoanChart() {
  const myContext = useContext(AppContext);
  return (
    <View style={styles.summarychart}>
      {myContext.label ? (
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Loan Interest & Principle Pay
          </Text>
          <Svg width={250} height={330} viewBox="-25 45 390 200">
            <VictoryPie
              standalone={false}
              width={350}
              height={400}
              data={myContext.graphicData}
              innerRadius={50}
              labelRadius={20}
              style={{
                labels: {
                  fontSize: 28,
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
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  summarychart: {
    backgroundColor: "white",
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
});
