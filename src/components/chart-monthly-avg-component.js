import React from "react";

const ChartMonthlyAvg = (props) => {
  const getMonthlyAverage = (year) => {
    // return (getYearlyAmount(year) / 12).toFixed(2);
  };

  return (
    <div>
      <h1>Monthly Avg</h1>
      <p>{getMonthlyAverage(props.year)}</p>
    </div>
  );
};

export default ChartMonthlyAvg;
