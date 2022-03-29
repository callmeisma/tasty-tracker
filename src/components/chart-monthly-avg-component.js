import React from "react";

const ChartMonthlyAvg = (props) => {
  // console.log("start");
  // console.log(props);
  const bigLoss = () => {
    let dateFiltered = props.trades.filter(
      (trade) => trade.startdate >= props.start && trade.enddate <= props.end
    );

    if (props.account !== "all") {
      dateFiltered = dateFiltered.filter(
        (trade) => trade.account === props.account
      );
    }

    // console.log(dateFiltered);
    return 0;
  };

  return (
    <div className="d-flex justify-content-evenly shadow p-2 my-3 bg-body rounded">
      <div className="d-flex flex-column align-items-center">
        <p>Monthly Avg</p>
        <h5>1</h5>
      </div>
      <div className="d-flex flex-column align-items-center">
        <p>Biggest Loss</p>
        <h5>{bigLoss()}</h5>
      </div>
      <div className="d-flex flex-column align-items-center">
        <p>Biggest Win</p>
        <h5>1</h5>
      </div>
      <div className="d-flex flex-column align-items-center">
        <p>Win Ratio</p>
        <h5>1</h5>
      </div>
    </div>
  );
};

export default ChartMonthlyAvg;
