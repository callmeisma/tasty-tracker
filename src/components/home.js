import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
// import ChartMonthlyAvg from "./chart-monthly-avg-component";
import ChartMonthly from "./chart-monthly-component";
import ChartReturns from "./chart-returns-component";
import ChartTopSymbols from "./chart-top-symbols-component";

const Home = (props) => {
  let today = moment().format("YYYY-MM-DD");
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState("All");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  useEffect(() => {
    axios
      .get("http://localhost:5000/transactions/")
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/accounts/")
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filterByDate = () => {
    const dateTrans = transactions.filter((transaction) => {
      return transaction.date > startDate && transaction.date < endDate;
    });
    return dateTrans;
  };

  const filterByAccount = (account) => {
    const dateTrans = filterByDate();
    const accTrans = dateTrans.filter((transaction) => {
      return transaction.account === account;
    });

    return accTrans;
  };

  const profitLoss = (account) => {
    if (account !== "All") {
      const accTrans = filterByAccount(account);
      return accTrans.reduce(function (accumulator, transaction) {
        return accumulator + transaction.value;
      }, 0);
    } else {
      const timeTrans = filterByDate();
      return timeTrans.reduce(function (accumulator, transaction) {
        return accumulator + transaction.value;
      }, 0);
    }
  };

  const feesOpen = (account) => {
    if (account !== "All") {
      const accTrans = filterByAccount(account);
      return accTrans.reduce(function (accumulator, transaction) {
        return accumulator + transaction.fees + transaction.commissions;
      }, 0);
    } else {
      const timeTrans = filterByDate();
      return timeTrans.reduce(function (accumulator, transaction) {
        return accumulator + transaction.fees + transaction.commissions;
      }, 0);
    }
  };

  const percReturn = () => {
    let investment = 0;
    for (let i = 0; i < accounts.length; i++) {
      investment += accounts[i].startingBalance;
    }
    return profitLoss(account) / investment;
  };

  const transactionsLength = () => {
    const dateTrans = filterByDate();
    return dateTrans.length;
  };

  const dateRangeUpdate = (range) => {
    switch (true) {
      case range === today:
        setStartDate(today);
        setEndDate(today);
        break;

      default:
        break;
    }
  };

  return (
    <div className="p-3">
      <form>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputAccount">
            Account:{" "}
          </label>
          <select
            required
            className="form-control"
            id="inputAccount"
            onChange={(e) => setAccount(e.target.value)}
          >
            <option>All</option>
            {accounts.map(function (accOpt) {
              return (
                <option key={accOpt.account} value={accOpt.account}>
                  {accOpt.account}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="startDate">
            Date Range
          </label>
          <select
            required
            className="form-control"
            id="dateRange"
            onChange={(e) => dateRangeUpdate(e.target.value)}
          >
            <option value="today">Today</option>
            <option>Last Week</option>
            <option>Last Month</option>
            <option>Year to Date</option>
            <option>Last Year</option>
            <option>All Time</option>
            <option>Custom</option>
          </select>
          <label className="input-group-text" htmlFor="startDate">
            Start Date
          </label>
          <input
            className="form-control"
            id="startDate"
            name="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label className="input-group-text" htmlFor="endDate">
            End Date
          </label>
          <input
            className="form-control"
            id="endDate"
            name="end-date"
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </form>
      <hr></hr>
      <div className="d-flex justify-content-evenly shadow p-3 mb-5 bg-body rounded">
        <div className="d-flex flex-column align-items-center">
          <p>Return</p>
          <h5>{percReturn().toFixed(1)}%</h5>
        </div>
        <div className="d-flex flex-column align-items-center">
          <p>P/L</p>
          <h5>${profitLoss(account).toFixed(2)}</h5>
        </div>
        <div className="d-flex flex-column align-items-center">
          <p>Fees</p>
          <h5>${feesOpen(account).toFixed(2)}</h5>
        </div>
        <div className="d-flex flex-column align-items-center">
          <p>Transactions</p>
          <h5>{transactionsLength()}</h5>
        </div>
      </div>
      {/* <ChartMonthlyAvg years={years} /> */}
      <ChartMonthly transactions={transactions} />
      <ChartReturns
        account={account}
        transactions={transactions}
        startDate={startDate}
        endDate={endDate}
      />
      <ChartTopSymbols />
    </div>
  );
};

export default Home;
