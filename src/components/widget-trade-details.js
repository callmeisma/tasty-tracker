import React, { useState, useEffect } from "react";

const TradeDetails = (props) => {
  const [tradeValuesArr, setTradeValuesArr] = useState([]);
  const [average, setAverage] = useState(0);
  const [ratio, setRatio] = useState(0);

  const filterRealizedTrades = (account, start, end) => {
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

  // ON PROPS CHANGE
  useEffect(() => {
    // Clear Array
    setTradeValuesArr([]);
    // Filter Realized
    const realized = filterRealizedTrades(
      props.account,
      props.startDate,
      props.endDate
    );

    // Add new values to array
    Object.keys(realized).map((trade) => {
      setTradeValuesArr((oldarray) => [...oldarray, realized[trade].value]);
    });
  }, [props]);

  useEffect(() => {
    getAverage();
    getRatio();
  }, [tradeValuesArr]);

  const biggest = (direction) => {
    if (direction === 0) {
      const loss = tradeValuesArr.filter((trade) => trade <= 0);
      loss.sort(function (a, b) {
        return a - b;
      });
      return loss[0] || 0;
    } else if (direction === 1) {
      const win = tradeValuesArr.filter((trade) => trade >= 0);
      win.sort(function (a, b) {
        return a - b;
      });
      const last = win.length - 1;
      return win[last] || 0;
    }
  };

  const getAverage = () => {
    let sum =
      tradeValuesArr.reduce((total, value) => total + value, 0) /
      tradeValuesArr.length;
    setAverage(sum);
  };

  const getRatio = () => {
    const win = tradeValuesArr.filter((trade) => trade >= 0);
    const best = (win.length / tradeValuesArr.length) * 100 || 0;
    setRatio(best);
  };

  return (
    <div className="d-flex justify-content-evenly shadow p-2 my-3 bg-body rounded">
      <div className="d-flex flex-column align-items-center">
        <p>Average Trade Value</p>
        <h5>${average.toFixed(2)}</h5>
      </div>
      <div className="d-flex flex-column align-items-center">
        <p>Biggest Loss</p>
        <h5>${biggest(0)}</h5>
      </div>
      <div className="d-flex flex-column align-items-center">
        <p>Biggest Win</p>
        <h5>${biggest(1)}</h5>
      </div>
      <div className="d-flex flex-column align-items-center">
        <p>Win Ratio</p>
        <h5>{ratio.toFixed(2)}%</h5>
      </div>
    </div>
  );
};

export default TradeDetails;
