import React, { useState } from "react";
import moment from "moment";
// import ChartMonthlyAvg from "./chart-monthly-avg-component";
import ChartMonthly from "./chart-monthly-component";
// import ChartReturns from "./chart-returns-component";
// import ChartTopSymbols from "./chart-top-symbols-component";

const Home = (props) => {
  let today = moment().format("YYYY-MM-DD");
  const [account, setAccount] = useState("All");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const filterByDate = () => {
    const tradeDate = props.trades.filter((trades) => {
      return trades.startDate > startDate && trades.endDate < endDate;
    });
    return tradeDate;
  };

  const filterByAccount = (account) => {
    const tradeDate = filterByDate();
    const tradeAccount = tradeDate.filter((trade) => {
      return trade.account === account;
    });

    return tradeAccount;
  };

  const profitLoss = (account) => {
    if (account !== "All") {
      const tradeAccount = filterByAccount(account);
      return tradeAccount.reduce(function (accumulator, trade) {
        return accumulator + trade.total;
      }, 0);
    } else {
      const timeTrans = filterByDate();
      return timeTrans.reduce(function (accumulator, trade) {
        return accumulator + trade.total;
      }, 0);
    }
  };

  const feesOpen = (account) => {
    if (account !== "All") {
      const tradeAccount = filterByAccount(account);
      return tradeAccount.reduce(function (accumulator, trade) {
        return accumulator + trade.fees + trade.commissions;
      }, 0);
    } else {
      const timeTrans = filterByDate();
      return timeTrans.reduce(function (accumulator, trade) {
        return accumulator + trade.fees + trade.commissions;
      }, 0);
    }
  };

  const percReturn = () => {
    let investment = 0;
    for (let i = 0; i < props.accounts.length; i++) {
      investment += props.accounts[i].startingBalance;
    }
    return profitLoss(account) / investment;
  };

  const tradesLength = () => {
    const tradeDate = filterByDate();
    return tradeDate.length;
  };

  const dateRangeUpdate = (range) => {
    console.log(range);
    switch (true) {
      case range === "today":
        setStartDate(today);
        setEndDate(today);
        break;
      case range === "last-week":
        setStartDate(today);
        setEndDate(today);
        break;
      case range === "last-month":
        setStartDate(today);
        setEndDate(today);
        break;
      case range === "year-to-date":
        setStartDate(today);
        setEndDate(today);
        break;
      case range === "last-year":
        setStartDate(today);
        setEndDate(today);
        break;
      case range === "all-time":
        setStartDate("2018-01-01");
        setEndDate("2023-01-01");
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
            Account:{""}
          </label>
          <select
            required
            className="form-control"
            id="inputAccount"
            onChange={(e) => setAccount(e.target.value)}
          >
            <option>All</option>
            {props.accounts.map(function (accOpt) {
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
            defaultValue="all-time"
            onChange={(e) => dateRangeUpdate(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
            <option value="year-to-date">Year to Date</option>
            <option value="last-year">Last Year</option>
            <option value="all-time">All Time</option>
            <option value="custom">Custom</option>
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
          <p>Trades</p>
          <h5>{tradesLength()}</h5>
        </div>
      </div>
      <ChartMonthly trades={props.trades} />
      {/* <ChartMonthlyAvg years={years} /> */}
      {/* <ChartReturns
        account={account}
        trades={props.trades}
        startDate={startDate}
        endDate={endDate}
      /> */}
      {/* <ChartTopSymbols /> */}
    </div>
  );
};

export default Home;
