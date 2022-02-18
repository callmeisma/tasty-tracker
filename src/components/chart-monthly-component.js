import React, { useState, useEffect } from "react";

const ChartMonthly = (props) => {
  const [years, setYears] = useState([]);

  const getYears = () => {
    const dateList = [];
    props.transactions.map((transaction) =>
      dateList.push(transaction.date.substring(0, 4))
    );
    const dateYears = [...new Set(dateList)];
    setYears(dateYears);
  };

  const getMonthlyReturns = (year, month) => {
    const inTransactions = props.transactions.filter(
      (transaction) =>
        transaction.date.substring(0, 4) === year &&
        transaction.date.substring(5, 7) === month &&
        (transaction.type === "Trade" || transaction.type === "Receive Deliver")
    );

    return inTransactions.reduce(function (total, currentValue) {
      var costs = Number(currentValue.fees) + Number(currentValue.value);
      if (currentValue.commissions !== "--") {
        costs = costs + Number(currentValue.commissions);
      }
      return total + costs;
    }, 0);
  };

  useEffect(() => {
    getYears();
  }, [props]);

  return (
    <div className="table-responsive shadow p-3 mb-5 bg-body rounded">
      <table className="table table-hover">
        <thead>
          <tr>
            <td></td>
            <td>Jan</td>
            <td>Feb</td>
            <td>Mar</td>
            <td>Apr</td>
            <td>May</td>
            <td>Jun</td>
            <td>Jul</td>
            <td>Aug</td>
            <td>Sept</td>
            <td>Oct</td>
            <td>Nov</td>
            <td>Dec</td>
          </tr>
        </thead>
        <tbody>
          {years.map(function (year, index) {
            return (
              <tr key={index}>
                <td key={index + year}>{year}</td>
                <td key={index + year + "01"}>
                  ${getMonthlyReturns(year, "01").toFixed(2)}
                </td>
                <td key={index + year + "02"}>
                  ${getMonthlyReturns(year, "02").toFixed(2)}
                </td>
                <td key={index + year + "03"}>
                  ${getMonthlyReturns(year, "03").toFixed(2)}
                </td>
                <td key={index + year + "04"}>
                  ${getMonthlyReturns(year, "04").toFixed(2)}
                </td>
                <td key={index + year + "05"}>
                  ${getMonthlyReturns(year, "05").toFixed(2)}
                </td>
                <td key={index + year + "06"}>
                  ${getMonthlyReturns(year, "06").toFixed(2)}
                </td>
                <td key={index + year + "07"}>
                  ${getMonthlyReturns(year, "07").toFixed(2)}
                </td>
                <td key={index + year + "08"}>
                  ${getMonthlyReturns(year, "08").toFixed(2)}
                </td>
                <td key={index + year + "09"}>
                  ${getMonthlyReturns(year, "09").toFixed(2)}
                </td>
                <td key={index + year + "10"}>
                  ${getMonthlyReturns(year, "10").toFixed(2)}
                </td>
                <td key={index + year + "11"}>
                  ${getMonthlyReturns(year, "11").toFixed(2)}
                </td>
                <td key={index + year + "12"}>
                  ${getMonthlyReturns(year, "12").toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ChartMonthly;