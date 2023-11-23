import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import AppContext from "../constants/globalvar";
import { TouchableOpacity } from "react-native";
import { btnClear, GeneratePDF, btnCalculate } from "../utils/general";

export default function LoanInput() {
  const myContext = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);

  const onChangeTextLoan = (text) => {
    if (+text || text == "") {
      myContext.setLoanAmount(text);
    }
  };

  const onChangeTextInterest = (text) => {
    if (+text || text == "") {
      myContext.setInterestRate(text);
    }
  };

  const onChangeTextTenure = (text) => {
    if ((+text && text <= 40) || text == "") {
      myContext.setTenure(text);
    }
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputView}>
        <Text style={styles.label}> Loan Amt (₹) : </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Loan Amount"
          keyboardType="numeric"
          maxLength={9}
          value={myContext.LoanAmount}
          onChangeText={onChangeTextLoan}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.label}>Interest Rate : </Text>
        <TextInput
          style={[styles.input, styles.inputmore]}
          placeholder="Enter Interest Rate%"
          keyboardType="numeric"
          maxLength={2}
          value={myContext.InterestRate}
          onChangeText={onChangeTextInterest}
        />
      </View>
      <View style={styles.inputView}>
        <Text style={styles.label}>Tenure:</Text>
        <TextInput
          style={[styles.input, styles.inputtenure]}
          placeholder="Enter Tenure Years"
          maxLength={2}
          keyboardType="numeric"
          value={myContext.Tenure}
          onChangeText={onChangeTextTenure}
        />
      </View>
      <View style={styles.inputView}>
        <TouchableOpacity
          style={[styles.screenButton]}
          disabled={
            myContext.LoanAmount && myContext.InterestRate && myContext.Tenure
              ? false
              : true
          }
          onPress={() => btnCalculate(myContext)}
        >
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.screenButton]}
          disabled={myContext.isready ? false : true}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Email PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.screenButton]}
          onPress={() => btnClear(myContext)}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView]}>
              <Text style={styles.modalText}>Email Address</Text>
              <TextInput
                style={[styles.input, styles.inputmore, { width: 265 }]}
                placeholder="Enter Email Address"
                value={myContext.email}
                onChangeText={myContext.setEmail}
              />
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {
                  if (myContext.email == "") {
                    Alert.alert("Warning", "Please enter your Email Address", [
                      { text: "OK" },
                    ]);
                    setModalVisible(modalVisible);
                  } else {
                    setModalVisible(!modalVisible);
                    GeneratePDF(myContext, myContext.email);
                  }
                }}
              >
                <Text
                  style={[
                    styles.textStyle,
                    {
                      height: 48,
                      width: 48,
                      verticalAlign: "middle",
                      fontSize: 21,
                      backgroundColor: "#9700ae",
                      color: "#ffffff",
                    },
                  ]}
                >
                  Ok
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text
                  style={[
                    styles.textStyle,
                    {
                      fontSize: 21,
                      height: 48,
                      width: 66,
                      verticalAlign: "middle",
                      backgroundColor: "#ffffff",
                      color: "#104e98",
                    },
                  ]}
                >
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "white",
    padding: 10,
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
  inputView: {
    justifyContent: "center",
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 5,
    marginLeft: 5,
    fontWeight: "bold",
  },
  input: {
    marginLeft: 10,
    fontSize: 17,
    height: 48,
    minHeight: 48,
    borderColor: "#ddd",
    borderWidth: 1,
    width: 175,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    color: "#595959",
  },
  screenButton: {
    marginRight: 5,
    height: 50,
    marginLeft: 2,
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: "darkorange",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 18,
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputmore: {
    marginLeft: 13,
    color: "#595959",
  },
  inputtenure: {
    marginLeft: 65,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 15,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
});
