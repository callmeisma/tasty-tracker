import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadTransactions = () => {
  const [account, setAccount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [csv, setCsv] = useState("");
  const [transactions, setTransactions] = useState([]);

  const csvHandler = (input) => {
    if (input.target.files && input.target.files[0]) {
      const reader = new FileReader();
      reader.readAsBinaryString(input.target.files[0]);
      reader.onload = (e) => {
        setCsv(e.target.result);
      };
    }
  };

  const csvJSON = (csv) => {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].replace("#", "number").split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};

      var fixline = rmvComma(lines[i]);

      // Get transaction values in an array
      var currentline = fixline.split(",");

      // Create object for each
      for (var h = 0; h < headers.length; h++) {
        obj[headers[h].toLowerCase().replace(/\s/g, "")] = currentline[h];
      }

      result.push(obj);
    }

    return setTransactions(result);
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

  const onSubmit = (e) => {
    e.preventDefault();

    csvJSON(csv);

    for (let i = 0; i < transactions.length - 1; i++) {
      console.log(transactions[i]);
      let transaction = {
        account: account,
        date: transactions[i].date,
        type: transactions[i].type,
        action: transactions[i].action,
        symbol: transactions[i].symbol,
        instrument: transactions[i].instrumenttype,
        description: transactions[i].description,
        value: transactions[i].value,
        quantity: transactions[i].quantity,
        avgprice: transactions[i].averageprice,
        commissions: transactions[i].commissions,
        fees: transactions[i].fees,
        multiplier: transactions[i].multiplier,
        rootsymbol: transactions[i].rootsymbol,
        underlyingsymbol: transactions[i].underlyingsymbol,
        expiration: transactions[i].expirationdate,
        strike: transactions[i].strikeprice,
        callput: transactions[i].callorput,
        order: transactions[i].ordernumber,
      };

      axios
        .post("http://localhost:5000/transactions/add", transaction)
        .then((res) => console.log(res.data));
    }

    // window.location = "/transactions";
  };

  useEffect(() => {
    axios.get("http://localhost:5000/accounts/").then((response) => {
      if (response.data.length > 0) {
        setAccounts(response.data.map((accounts) => accounts.account));
      }
    });
  }, []);

  return (
    <div>
      <h3>Upload Transactions</h3>
      <form className="m-3 w-75" onSubmit={(e) => onSubmit(e)}>
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
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadTransactions;
