import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useContext } from "react";
import AppContext from "../constants/globalvar";
import LoanInput from "./loaninput";
import LoanSummary from "./loansummary";
import LoanChart from "./loanchart";
import RowList from "./rowlist.js";

function loanschedule() {
  const FlatList_Header = () => {
    return (
      <View>
        <LoanInput />
        <LoanSummary />
        <LoanChart />
      </View>
    );
  };
  const myContext = useContext(AppContext);
  return (
    <View>
      <FlatList
        //height={690}
        data={myContext.items}
        ListHeaderComponent={FlatList_Header()}
        initialNumToRender={10}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <RowList data={item} />;
        }}
      />
    </View>
  );
}
export default loanschedule;

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
});
