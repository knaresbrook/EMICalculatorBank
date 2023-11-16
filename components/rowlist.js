import { memo } from "react";
import { Text, View, StyleSheet } from "react-native";

const RowList = (props) => {
  typeof Number(props.data.Month) ? (
    <Text style={{ backgroundColor: "darkorange", color: "white" }}>
      {props.data.Month}
    </Text>
  ) : (
    <Text style={styles.label}>{props.data.Month}</Text>
  );

  return (
    <View
      style={{
        flexDirection: "row",
        marginLeft: 15,
        marginTop: 0,
      }}
    >
      {isNaN(props.data.Month) ? (
        <Text style={[styles.label, styles.labelfirstcol]}>
          {props.data.Month}
        </Text>
      ) : (
        <Text style={[styles.label, styles.labelfirstcol, styles.labelorange]}>
          {props.data.Month}
        </Text>
      )}
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
    padding: 3,
    width: 68,
    textAlign: "right",
    borderColor: "darkorange",
    borderWidth: 1,
  },
  labelfirstcol: {
    textAlign: "center",
  },
  labelorange: {
    backgroundColor: "darkorange",
    color: "white",
  },
});

export default memo(RowList);
