import React from "react";
import uniqid from "uniqid";

const TradesList = (props) => {

  return (
    <div>
      <h3>Trades</h3>
      <p>{props.trades.length}</p>
      <div className="table-responsive">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th key="account">Account</th>
              <th key="startdate">Start Date</th>
              <th key="enddate">End Date</th>
              <th key="symbol">Symbol</th>
              <th key="action">Action</th>
              <th key="total">Total</th>
              <th key="value">Value</th>
              <th key="fees">Fees</th>
              <th key="commissions">Commissions</th>
            </tr>
          </thead>
          <tbody>
            {props.trades.map(function (trade) {
              return (
                <tr key={uniqid()} id={trade._id}>
                  <td key={uniqid()}>{trade.account}</td>
                  <td key={uniqid()}>{trade.startdate.substring(0, 10)}</td>
                  <td key={uniqid()}>{trade.enddate}</td>
                  <td key={uniqid()}>{trade.symbol}</td>
                  <td key={uniqid()}>{trade.callput}</td>
                  <td key={uniqid()}>${(trade.value + trade.fees + trade.commissions).toFixed(2)}</td>
                  <td key={uniqid()}>${trade.value}</td>
                  <td key={uniqid()}>${trade.fees.toFixed(2)}</td>
                  <td key={uniqid()}>${trade.commissions}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradesList;
