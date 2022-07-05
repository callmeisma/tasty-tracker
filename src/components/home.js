import React, { useState, useEffect } from "react";
import moment from "moment";
import ChartMonthly from "./chart-monthly-component";
import TradeDetails from "./widget-trade-details";
import AccountDetails from "./widget-account-details";
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
    <div className="p-3 d-flex flex-column min-vh-100">
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
      <AccountDetails
        account={accSel}
        startDate={startDate}
        endDate={endDate}
        accounts={props.accounts}
        trades={props.trades}
        transactions={props.transactions}
      />
      <TradeDetails
        trades={props.trades}
        account={accSel}
        startDate={startDate}
        endDate={endDate}
      />
      <ChartMonthly trades={props.trades} account={accSel} />
      {/* <ChartReturns
        account={account}
        trades={props.trades}
        startDate={startDate}
        endDate={endDate}
      /> */}
      {/* <ChartTopSymbols /> */}

      <footer class="d-flex align-items-center justify-content-center mt-auto">
        <p class="m-0 p-2">Copyright © Ismael Fernandez</p>
        <a href="https://github.com/callmeisma/tasty-tracker" target="_blank">
          <i class="fab fa-github" aria-hidden="true"></i>
        </a>
      </footer>
    </div>
  );
};

export default Home;
