import { VictoryPie, VictoryLegend, VictoryLabel } from "victory-native";
import { StyleSheet, View } from "react-native";
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
          <Svg width={250} height={330} viewBox="-05 45 365 200">
            <VictoryPie
              standalone={false}
              width={360}
              height={300}
              data={myContext.graphicData}
              innerRadius={30}
              labelRadius={32}
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
                { name: "Interest Pay", symbol: { fill: "green" } },
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
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    height: 205,
    marginTop: 8,
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
