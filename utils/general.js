import { Alert } from "react-native";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

const sendEmail = async (file, emailAddr, myContext) => {
  var options = {};

  options = {
    subject: "Loan Amortization Schedule PDF attachment",
    recipients: [emailAddr],
    body: "Please find attached your EMI Calculation for Home Loan.",
    attachments: file,
  };

  let promise = new Promise((resolve, reject) => {
    MailComposer.composeAsync(options)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
  promise.then(
    (result) => {
      myContext.setStatus("Status: email " + result.status);
      Alert.alert("Info", result.status, [{ text: "OK" }]);
    },
    (error) => {
      myContext.setStatus("Status: email " + error.status);
      Alert.alert("Error", error.status, [{ text: "OK" }]);
    }
  );
};

module.exports.sendEmail = sendEmail;

async function sharePDF(LoanAmount, InterestRate, Tenure, items) {
  try {
    var htmlText = htmlNoContext(LoanAmount, InterestRate, Tenure, items);
    const { uri } = await Print.printToFileAsync({
      html: htmlText,
      base64: false,
    });

    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  } catch (error) {
    Alert.alert("Error", error.message, [{ text: "OK" }]);
  }
}

module.exports.sharePDF = sharePDF;

async function GeneratePDF(myContext, emailAddress) {
  try {
    var htmlText = htmlContext(myContext);
    const { uri } = await Print.printToFileAsync({
      html: htmlText,
      base64: false,
    });

    sendEmail([uri], emailAddress, myContext);
  } catch (error) {
    Alert.alert("Error", error.message, [{ text: "OK" }]);
  }
}

module.exports.GeneratePDF = GeneratePDF;

const htmlContext = (myContext) => {
  return `    
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
</head>
<body style="font-family: Helvetica; font-weight: normal; font-size:14px;margin-left:120px;margin-right:120px;">
<div style="display: flex; justify-content: center; padding: 0 20px;background-color:darkorange;color:white;">
<h2>Loan Amortization Schedule</h2>
</div>
<div style="text-decoration:underline">
<h3>Loan Amount (₹): ${Number(myContext.LoanAmount).toLocaleString()}</h3>
</div>
<div style="text-decoration:underline">
<h3>Interest Rate: ${myContext.InterestRate}%</h3>
</div>
<div style="text-decoration:underline">
<h3>Tenure (Years): ${myContext.Tenure}</h3>
</div>
<table style="width: 100%; border-collapse: collapse;border: 1px solid;font-size:12px">
          <tr style="background-color: darkorange;color:black;border: 1px solid">
            <th>Month</th>
            <th>Principle(₹)</th>
            <th>Interest(₹)</th>
            <th>Total Payment(₹)</th>
            <th>Balance(₹)</th>
          </tr>
          ${myContext.items
            .map(
              (line) => `
            <tr style="border: 1px solid; border-color: darkorange">
              <td style="border: 1px solid; border-color: darkorange;text-align:center">${
                line.Month
              }</td>
              <td style="border: 1px solid; border-color: darkorange;text-align:right">${Number(
                line.Principal
              ).toLocaleString()}</td>
              <td style="border: 1px solid; border-color: darkorange;text-align:right">${Number(
                line.Interest
              ).toLocaleString()}</td>
              <td style="border: 1px solid; border-color: darkorange;text-align:right">${Number(
                line.TotalPayment
              ).toLocaleString()}</td>
              <td style="border: 1px solid; border-color: darkorange;text-align:right">${Number(
                line.Balance
              ).toLocaleString()}</td>
            </tr>
          `
            )
            .join("")}
        </table>
        <div style="background-color: darkorange; color: white; display: flex; justify-content: center; padding: 0 20px;">
          <p>Thank you for your business!</p>
        </div>
      </body>
    </html>
  `;
};

module.exports.htmlContext = htmlContext;

const htmlNoContext = (LoanAmount, InterestRate, Tenure, items) => {
  return `    
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
</head>
<body style="font-family: Helvetica; font-weight: normal; font-size:14px;margin-left:120px;margin-right:120px;">
<div style="display: flex; justify-content: center; padding: 0 20px;background-color:darkorange;color:white;">
<h2>Loan Amortization Schedule</h2>
</div>
<div style="text-decoration:underline">
<h3>Loan Amount (₹): ${Number(LoanAmount).toLocaleString()}</h3>
</div>
<div style="text-decoration:underline">
<h3>Interest Rate: ${InterestRate}%</h3>
</div>
<div style="text-decoration:underline">
<h3>Tenure (Years): ${Tenure}</h3>
</div>
<table style="width: 100%; border-collapse: collapse;border: 1px solid;font-size:12px">
          <tr style="background-color: darkorange;color:black;border: 1px solid">
            <th>Month</th>
            <th>Principle(₹)</th>
            <th>Interest(₹)</th>
            <th>Total Payment(₹)</th>
            <th>Balance(₹)</th>
          </tr>
          ${items
            .map(
              (line) => `
            <tr style="border: 1px solid; border-color: darkorange">
              <td style="border: 1px solid; border-color: darkorange;text-align:center">${
                line.Month
              }</td>
              <td style="border: 1px solid; border-color: darkorange;text-align:right">${Number(
                line.Principal
              ).toLocaleString()}</td>
              <td style="border: 1px solid; border-color: darkorange;text-align:right">${Number(
                line.Interest
              ).toLocaleString()}</td>
              <td style="border: 1px solid; border-color: darkorange;text-align:right">${Number(
                line.TotalPayment
              ).toLocaleString()}</td>
              <td style="border: 1px solid; border-color: darkorange;text-align:right">${Number(
                line.Balance
              ).toLocaleString()}</td>
            </tr>
          `
            )
            .join("")}
        </table>
        <div style="background-color: darkorange; color: white; display: flex; justify-content: center; padding: 0 20px;">
          <p>Thank you for your business!</p>
        </div>
      </body>
    </html>
  `;
};

module.exports.htmlNoContext = htmlNoContext;

const btnClear = (myContext) => {
  try {
    myContext.setLoanAmount("");
    myContext.setInterestRate("");
    myContext.setTenure("");
    myContext.setMonthlyEMI("");
    myContext.setTotalAmountPayable("");
    myContext.setTotalInterestPayable("");
    myContext.setGraphicData([]);
    myContext.setLabel(false);
    myContext.setItems([]);
    myContext.setEmail("");
    myContext.setIsReady(false);
  } catch (error) {
    Alert.alert("Error", error.message, [{ text: "OK" }]);
  }
};

module.exports.btnClear = btnClear;

const btnCalculate = (myContext) => {
  try {
    if (Number(myContext.LoanAmount) < 1000) {
      Alert.alert("Warning", "Minimum Loan Amount is 1000 Rs/=", [
        { text: "OK" },
      ]);
    } else {
      const intRate = Number(myContext.InterestRate) / 12 / 100;
      const noOfMonths = Number(myContext.Tenure) * 12;
      const powerValue = Math.pow(1 + intRate, noOfMonths);

      let _MonthlyEMI =
        (Number(myContext.LoanAmount) * intRate * powerValue) /
        (powerValue - 1);
      let _TotalAmountPayable = _MonthlyEMI * noOfMonths;
      let _TotalInterestPayable =
        _TotalAmountPayable - Number(myContext.LoanAmount);

      myContext.setMonthlyEMI(Math.round(_MonthlyEMI).toString());
      myContext.setTotalAmountPayable(
        Math.round(_TotalAmountPayable).toString()
      );
      myContext.setTotalInterestPayable(
        Math.round(_TotalInterestPayable).toString()
      );

      var intpay = (_TotalInterestPayable / _TotalAmountPayable) * 100;
      var princ = (myContext.LoanAmount / _TotalAmountPayable) * 100;

      myContext.setLabel(true);

      var principle = Number(princ).toFixed(1).toString() + "%";
      var interestpay = Number(intpay).toFixed(1).toString() + "%";

      const wantedGraphicData = [
        { x: interestpay, y: _TotalInterestPayable },
        { x: principle, y: Number(myContext.LoanAmount) },
      ];

      myContext.setGraphicData(wantedGraphicData);

      loanSchedule(_MonthlyEMI, myContext);
      myContext.setIsReady(true);
    }
  } catch (error) {
    Alert.alert("Error", error.message, [{ text: "OK" }]);
  }
};

module.exports.btnCalculate = btnCalculate;

const loanSchedule = (_MonthlyEMI, myContext) => {
  try {
    principleAmt = 0;
    interestAmt = 0;
    loanBalanceAmt = Number(myContext.LoanAmount);
    var currentTime = new Date();

    currentYear = currentTime.getFullYear();
    currentMonth = currentTime.getMonth() + 1;
    numMonths = Number(myContext.Tenure) * 12;
    countMonths = 0;
    cMths = 0;

    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    var itemsList = [];

    for (x = 1; x <= 1; x++) {
      for (i = currentMonth; i <= currentMonth + 11; i++) {
        var Loan = {};
        firstPrincipalAmt =
          Number(_MonthlyEMI) -
          Number(loanBalanceAmt) * (Number(myContext.InterestRate) / 100 / 12);
        firstInterestAmt =
          (Number(myContext.InterestRate) / 100 / 12) * loanBalanceAmt;
        loanBalanceAmt = loanBalanceAmt - firstPrincipalAmt;
        principleAmt = principleAmt + firstPrincipalAmt;
        interestAmt = interestAmt + firstInterestAmt;

        var date = new Date(currentYear, i - 1, 1);

        Loan["Month"] = monthNames[date.getMonth()];
        Loan["Year"] = currentYear;
        Loan["Principal"] = Math.round(firstPrincipalAmt);
        Loan["Interest"] = Math.round(firstInterestAmt);
        Loan["TotalPayment"] = Math.round(firstPrincipalAmt + firstInterestAmt);
        Loan["Balance"] = Math.round(loanBalanceAmt);
        itemsList.push(Loan);
        countMonths++;

        if (i == 12 && countMonths != numMonths) {
          var Loan = {};
          Loan["Year"] = currentYear;
          Loan["Month"] = currentYear.toString();
          Loan["Principal"] = Math.round(principleAmt);
          Loan["Interest"] = Math.round(interestAmt);
          Loan["TotalPayment"] = Math.round(principleAmt + interestAmt);
          Loan["Balance"] = Math.round(loanBalanceAmt);

          itemsList.push(Loan);
          principleAmt = 0;
          interestAmt = 0;
          i = 0;
          currentYear++;
        }
        if (countMonths == numMonths) break;
      }

      var Loan = {};
      Loan["Year"] = currentYear;
      Loan["Month"] = currentYear.toString();
      Loan["Principal"] = Math.round(principleAmt);
      Loan["Interest"] = Math.round(interestAmt);
      Loan["TotalPayment"] = Math.round(principleAmt + interestAmt);
      Loan["Balance"] = Math.round(loanBalanceAmt);

      itemsList.push(Loan);

      principleAmt = 0;
      interestAmt = 0;
      currentMonth = 1;
      currentYear++;
    }

    myContext.setItems(itemsList);
    myContext.setLabel(true);
  } catch (error) {
    Alert.alert("Error", error.message, [{ text: "OK" }]);
  }
};

module.exports.loanSchedule = loanSchedule;
