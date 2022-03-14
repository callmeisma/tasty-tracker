import React, { useState, useEffect } from "react";
import moment from "moment";
import ChartMonthly from "./chart-monthly-component";
// import ChartMonthlyAvg from "./chart-monthly-avg-component";
// import ChartTopSymbols from "./chart-top-symbols-component";
// import ChartReturns from "./chart-returns-component";

const Home = (props) => {
  let today = moment().format("YYYY-MM-DD");
  const [accSel, setAccSel] = useState("all");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  useEffect(() => {
    dateRangeUpdate("year-to-date");
  }, []);

  const filterTrades = (account, start, end) => {
    // Filter by start and end dates selected
    const tradesInDateRange = props.trades.filter((trade) => {
      return (
        trade.startdate.substring(0, 10) >= start &&
        trade.enddate !== undefined &&
        trade.enddate.substring(0, 10) <= end
      );
    });
    // Filter by account selected
    if (account === "all") {
      return tradesInDateRange;
    } else {
      const tradesInDateAcc = tradesInDateRange.filter((trade) => {
        return trade.account === account;
      });
      return tradesInDateAcc;
    }
  };

  const profitLoss = (account, start, end) => {
    const trades = filterTrades(account, start, end);
    return trades.reduce(function (accumulator, trade) {
      return accumulator + trade.total;
    }, 0);
  };

  const feesOpen = (account, start, end) => {
    const trades = filterTrades(account, start, end);
    return trades.reduce(function (accumulator, trade) {
      return accumulator + trade.fees + trade.commissions;
    }, 0);
  };

  const percReturn = (account, start, end) => {
    // Get account money movements
    let moneyMovement = [];
    if (account === "all") {
      moneyMovement = props.transactions.filter(
        (transaction) => transaction.type === "Money Movement"
      );
    } else {
      moneyMovement = props.transactions.filter(
        (transaction) =>
          transaction.account === account &&
          transaction.type === "Money Movement"
      );
    }

    // Get money invested
    let investment = 0;
    // Get starting balances
    if (account === "all") {
      for (let i = 0; i < props.accounts.length; i++) {
        investment += props.accounts[i].startingBalance;
      }
    } else {
      for (let i = 0; i < props.accounts.length; i++) {
        if (props.accounts[i] === account)
          investment += props.accounts[i].startingBalance;
      }
    }
    // Get money invested
    for (let i = 0; i < moneyMovement.length; i++) {
      investment += moneyMovement[i].value;
    }
    return (profitLoss(accSel, start, end) / investment) * 100;
  };

  const getFirstLastDate = (account) => {
    const dates = [];

    if (account === "all") {
      for (let i = 0; i < props.trades.length; i++) {
        dates.push(props.trades[i].startdate, props.trades[i].enddate);
      }
    } else {
      const accTrades = props.trades.filter(
        (trade) => trade.account === account
      );
      for (let i = 0; i < accTrades.length; i++) {
        dates.push(accTrades[i].startdate, accTrades[i].enddate);
      }
    }

    const cleanDates = dates.filter((date) => date !== undefined).sort();
    const firstDate = cleanDates[0];
    const lastDate = cleanDates[cleanDates.length - 1];

    return [firstDate, lastDate];
  };

  const dateRangeUpdate = (range) => {
    switch (true) {
      case range === "today":
        document.getElementById("startDate").disabled = true;
        document.getElementById("endDate").disabled = true;
        setStartDate(moment().startOf("day").format("YYYY-MM-DD"));
        setEndDate(moment().format("YYYY-MM-DD"));
        break;
      case range === "week-to-date":
        document.getElementById("startDate").disabled = true;
        document.getElementById("endDate").disabled = true;
        setStartDate(moment(today).startOf("week").format("YYYY-MM-DD"));
        setEndDate(moment(today).endOf("day").format("YYYY-MM-DD"));
        break;
      case range === "month-to-date":
        document.getElementById("startDate").disabled = true;
        document.getElementById("endDate").disabled = true;
        setStartDate(moment(today).startOf("month").format("YYYY-MM-DD"));
        setEndDate(moment(today).format("YYYY-MM-DD"));
        break;
      case range === "last-month":
        document.getElementById("startDate").disabled = true;
        document.getElementById("endDate").disabled = true;
        setStartDate(moment(today).subtract(1, "month").format("YYYY-MM-DD"));
        setEndDate(moment(today).endOf("day").format("YYYY-MM-DD"));
        break;
      case range === "year-to-date":
        document.getElementById("startDate").disabled = true;
        document.getElementById("endDate").disabled = true;
        setStartDate(moment(today).startOf("year").format("YYYY-MM-DD"));
        setEndDate(moment(today).format("YYYY-MM-DD"));
        break;
      case range === "last-year":
        document.getElementById("startDate").disabled = true;
        document.getElementById("endDate").disabled = true;
        setStartDate(moment(today).subtract(1, "year").format("YYYY-MM-DD"));
        setEndDate(moment().endOf("day").format("YYYY-MM-DD"));
        break;
      case range === "all-time":
        const dates = getFirstLastDate(accSel);
        document.getElementById("startDate").disabled = true;
        document.getElementById("endDate").disabled = true;
        setStartDate(moment(dates[0]).format("YYYY-MM-DD"));
        setEndDate(moment(dates[1]).format("YYYY-MM-DD"));
        break;
      case range === "custom":
        document.getElementById("startDate").disabled = false;
        document.getElementById("endDate").disabled = false;
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-3">
      <form>
        {/* accounts */}
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputAccount">
            Account:{""}
          </label>
          <select
            required
            className="form-control"
            id="inputAccount"
            onChange={(e) => setAccSel(e.target.value.toLowerCase())}
            defaultValue="all"
          >
            <option key="all" value="all">
              All
            </option>
            {props.accounts.map(function (accOpt) {
              return (
                <option key={accOpt.account} value={accOpt.account}>
                  {accOpt.account}
                </option>
              );
            })}
          </select>
        </div>
        {/* Date Ranges */}
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="startDate">
            Date Range
          </label>
          <select
            required
            className="form-control"
            id="dateRange"
            defaultValue="year-to-date"
            onChange={(e) => dateRangeUpdate(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week-to-date">Week to Date</option>
            <option value="month-to-date">Month to Date</option>
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
            disabled
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
            disabled
          />
        </div>
      </form>
      {/* Overall Info */}
      <div className="d-flex justify-content-evenly shadow p-3 mb-5 bg-body rounded">
        <div className="d-flex flex-column align-items-center">
          <p>Return</p>
          <h5>{percReturn(accSel, startDate, endDate).toFixed(2)}%</h5>
        </div>
        <div className="d-flex flex-column align-items-center">
          <p>P/L</p>
          <h5>${profitLoss(accSel, startDate, endDate).toFixed(2)}</h5>
        </div>
        <div className="d-flex flex-column align-items-center">
          <p>Fees</p>
          <h5>${feesOpen(accSel, startDate, endDate).toFixed(2)}</h5>
        </div>
        <div className="d-flex flex-column align-items-center">
          <p>Trades</p>
          <h5>{filterTrades(accSel, startDate, endDate).length}</h5>
        </div>
      </div>
      <ChartMonthly trades={props.trades} account={accSel} />
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
