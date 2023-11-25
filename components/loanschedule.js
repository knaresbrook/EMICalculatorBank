import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useContext } from "react";
import AppContext from "../constants/globalvar";
import RowList from "./rowlist.js";

export default function LoanSchedule() {
  const myContext = useContext(AppContext);
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          marginLeft: 0,
          marginTop: 20,
          height: 35,
          backgroundColor: "darkorange",
          borderColor: "darkorange",
          borderWidth: 1,
          width: 341,
        }}
      >
        <Text style={styles.label}>Month</Text>
        <Text style={styles.label}>Principle</Text>
        <Text style={styles.label}>Interest</Text>
        <Text style={styles.label}>Paymt</Text>
        <Text style={styles.label}>Balance</Text>
      </View>
      <FlatList
        //height={690}
        data={myContext.items}
        initialNumToRender={10}
        maxToRenderPerBatch={30}
        refreshing={true}
        contentContainerStyle={{ paddingBottom: 60 }}
        ListFooterComponent={() => (
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              backgroundColor: "#c42113",
              color: "white",
              height: 35,
              padding: 3,
            }}
          >
            End of Data
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <RowList data={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  label: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 7,
  },
});
