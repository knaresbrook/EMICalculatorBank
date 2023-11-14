import react, { memo } from "react";
import { Text, View, StyleSheet } from "react-native";

const RowList = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginLeft: 15,
        marginTop: 0,
      }}
    >
      <Text style={styles.label}>{props.data.Month}</Text>
      <Text style={styles.label}>{props.data.Principal}</Text>
      <Text style={styles.label}>{props.data.Interest}</Text>
      <Text style={styles.label}>{props.data.TotalPayment}</Text>
      <Text style={styles.label}>{props.data.Balance}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginLeft: 0,
    padding: 2,
    width: 59,
    textAlign: "right",
    borderColor: "darkorange",
    borderWidth: 1,
  },
});

export default memo(RowList);
