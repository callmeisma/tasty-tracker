import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadTransactions = (props) => {
  const [account, setAccount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [csv, setCsv] = useState("");
  const [row, setRow] = useState([]);
  const [progress, setProgress] = useState(0);

  const csvHandler = (input) => {
    if (input.target.files && input.target.files[0]) {
      const reader = new FileReader();
      reader.readAsBinaryString(input.target.files[0]);
      reader.onload = (e) => {
        setCsv(e.target.result);
      };
    }
  };

  const rmvComma = (line) => {
    // Get between quotes
    const quotedRegEx = /(["'])(?:(?=(\\?))\2.)*?\1/g;
    let quotes = line.match(quotedRegEx);
    let oldQuotes = line.match(quotedRegEx);
    let result = line;

    // Remove commas from each result
    if (quotes !== null) {
      for (let j = 0; j < quotes.length; j++) {
        quotes[j] = quotes[j].replace(",", "");

        // Replace old string with new one
        result = result.replace(oldQuotes[j], quotes[j].slice(1, -1));
      }
    }
    return result;
  };

  const csvJSON = (csv) => {
    let lines = csv.split("\n");
    let result = [];
    let headers = lines[0].replace("#", "number").split(",");

    for (let i = 0; i < lines.length; i++) {
      let obj = {};

      let fixline = rmvComma(lines[i]).replace("--", "");

      // Get transaction values in an array
      let currentline = fixline.split(",");

      // Create object for each
      for (let h = 0; h < headers.length; h++) {
        obj[headers[h].toLowerCase().replace(/\s/g, "")] = currentline[h];
      }

      result.push(obj);
    }

    // Filter empty rows and header
    result = result.filter(
      (res) =>
        res.date !== "Date" && (res.date !== undefined) & (res.date !== "")
    );

    return setRow(result);
  };

  const createTransactions = () => {
    let transactionArr = [];
    for (let i = 0; i < row.length; i++) {
      let transaction = {
        account: account,
        action: row[i].action || "",
        avgprice: Number(row[i].averageprice),
        callput: row[i].callorput || "",
        commissions: Number(row[i].commissions),
        date: row[i].date,
        description: row[i].description,
        expiration: row[i].expirationdate,
        fees: Number(row[i].fees),
        instrument: row[i].instrumenttype,
        multiplier: Number(row[i].multiplier),
        order: Number(row[i].ordernumber),
        quantity: Number(row[i].quantity),
        rootsymbol: row[i].rootsymbol,
        strikeprice: Number(row[i].strikeprice),
        symbol: row[i].symbol || "",
        type: row[i].type,
        underlyingsymbol: row[i].underlyingsymbol || "",
        value: Number(row[i].value),
      };

      transactionArr.push(transaction);
    }

    return transactionArr;
  };

  const removeDuplicateTransactions = (newTrans) => {
    let result = newTrans.filter(
      (o1) =>
        !props.transactions.some(
          (o2) =>
            o1.account === o2.account &&
            o1.action === o2.action &&
            o1.avgprice === o2.avgprice &&
            o1.callput === o2.callput &&
            o1.commissions === o2.commissions &&
            // o1.date === o2.date &&
            o1.description === o2.description &&
            // o1.expiration === o2.expiration &&
            o1.fees === o2.fees &&
            o1.instrument === o2.instrument &&
            o1.multiplier === o2.multiplier &&
            o1.order === o2.order &&
            o1.rootsymbol === o2.rootsymbol &&
            o1.strikeprice === o2.strikeprice &&
            o1.symbol === o2.symbol &&
            o1.type === o2.type &&
            o1.underlyingsymbol === o2.underlyingsymbol &&
            o1.value === o2.value
        )
    );

    return result;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const progressDiv = document.getElementById("progress");
    const transactions = createTransactions();
    // Check if any transactions exists in database
    if (props.transactions.length > 0) {
      const newTransactions = removeDuplicateTransactions(transactions);
      // Handle only new transactions
      if (newTransactions.length > 0) {
        for (let i = 0; i < newTransactions.length; i++) {
          progressDiv.style.display = "block";
          await axios
            .post("http://localhost:4000/transactions/add", newTransactions[i])
            .then((res) => console.log(res.data))
            .then(
              setProgress(Math.round((i / (newTransactions.length - 1)) * 100))
            );
        }
      }
      // Handle all transactions already exist
      else {
        return alert("All transactions on file already exist");
      }
    }
    // If no transactions in database
    else {
      for (let i = 0; i < transactions.length; i++) {
        progressDiv.style.display = "block";
        await axios
          .post("http://localhost:4000/transactions/add", transactions[i])
          .then((res) => console.log(res.data))
          .then(setProgress(Math.round((i / (transactions.length - 1)) * 100)));
      }
    }

    // Update props
    axios
      .get("http://localhost:4000/transactions/")
      .then((res) => {
        props.setTransactions(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:4000/accounts/").then((response) => {
      if (response.data.length > 0) {
        setAccounts(response.data.map((accounts) => accounts.account));
      }
    });
  }, []);

  useEffect(() => {
    csvJSON(csv);
  }, [csv]);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        document.getElementById("progress").style.display = "none";
        window.location = "/transactions";
      }, 1000);
    }
  }, [progress]);

  return (
    <div className="p-3">
      <h3>Upload Transactions</h3>
      <form className="m-3 w-75" id="csv-form" onSubmit={(e) => onSubmit(e)}>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputAccount">
            Account
          </label>
          <select
            required
            className="form-control"
            id="inputAccount"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          >
            <option key="account" value="" disabled>
              Choose Account...
            </option>
            {accounts.map(function (account) {
              return (
                <option key={account} value={account}>
                  {account}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={(e) => csvHandler(e)}
            required
          />
        </div>
        <div
          className="progress mb-3"
          id="progress"
          style={{ display: "none" }}
        >
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: progress + "%" }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {progress}%
          </div>
        </div>
        <button type="submit" className="btn btn-primary" form="csv-form">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadTransactions;
