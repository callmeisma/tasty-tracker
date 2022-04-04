import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadTransactions = (props) => {
  const [account, setAccount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [csv, setCsv] = useState("");
  const [row, setRow] = useState([]);

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
    var quotes = line.match(quotedRegEx);
    var oldQuotes = line.match(quotedRegEx);
    var result = line;

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
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].replace("#", "number").split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};

      var fixline = rmvComma(lines[i]).replace("--", "");

      // Get transaction values in an array
      var currentline = fixline.split(",");

      // Create object for each
      for (var h = 0; h < headers.length; h++) {
        obj[headers[h].toLowerCase().replace(/\s/g, "")] = currentline[h];
      }

      result.push(obj);
    }

    return setRow(result);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    csvJSON(csv);

    for (let i = 0; i < row.length; i++) {
      let transaction = {
        account: account,
        action: row[i].action || "",
        avgprice: row[i].averageprice || "",
        callput: row[i].callorput || "",
        commissions: row[i].commissions || "",
        date: row[i].date,
        description: row[i].description,
        expiration: row[i].expirationdate,
        fees: row[i].fees,
        instrument: row[i].instrumenttype || "",
        multiplier: row[i].multiplier || "",
        order: row[i].ordernumber || "",
        quantity: row[i].quantity,
        rootsymbol: row[i].rootsymbol || "",
        strikeprice: row[i].strikeprice || "",
        symbol: row[i].symbol || "",
        type: row[i].type,
        underlyingsymbol: row[i].underlyingsymbol || "",
        value: row[i].value,
      };
      axios
        .post("http://localhost:4000/transactions/add", transaction)
        .then((res) => console.log(res.data));
    }

    axios
      .get("http://localhost:4000/transactions/")
      .then((response) => {
        props.setTransactions(response.data);
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
        <button type="submit" className="btn btn-primary" form="csv-form">
          Submit
        </button>
      </form>
      <div className="progress w-50 m-3">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: "25%" }}
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          25%
        </div>
      </div>
    </div>
  );
};

export default UploadTransactions;
