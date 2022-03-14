import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadTransactions = () => {
  const [account, setAccount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [csv, setCsv] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [added, setAdded] = useState("");

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

    return setTransactions(result);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    csvJSON(csv);

    for (let i = 0; i < transactions.length; i++) {
      let transaction = {
        account: account,
        action: transactions[i].action || "",
        avgprice: transactions[i].averageprice || "",
        callput: transactions[i].callorput || "",
        commissions: transactions[i].commissions || "",
        date: transactions[i].date,
        description: transactions[i].description,
        expiration: transactions[i].expirationdate,
        fees: transactions[i].fees,
        instrument: transactions[i].instrumenttype || "",
        multiplier: transactions[i].multiplier || "",
        order: transactions[i].ordernumber || "",
        quantity: transactions[i].quantity,
        rootsymbol: transactions[i].rootsymbol || "",
        strikeprice: transactions[i].strikeprice || "",
        symbol: transactions[i].symbol || "",
        type: transactions[i].type,
        underlyingsymbol: transactions[i].underlyingsymbol || "",
        value: transactions[i].value,
      };
      axios
        .post("http://localhost:4000/transactions/add", transaction)
        .then((res) => console.log(res.data), setAdded("Transactions added"));
    }
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
          />
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-primary"
            form="csv-form"
            onClick={(e) => onSubmit(e)}
          >
            Submit
          </button>
        </div>
      </form>
      <p>{added}</p>
    </div>
  );
};

export default UploadTransactions;
