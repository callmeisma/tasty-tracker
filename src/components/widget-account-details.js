import React, { useEffect, useState } from "react";

const AccountDetails = (props) => {
  const [realized, setRealized] = useState([]);
  const [unrealized, setUnrealized] = useState([]);

  useEffect(() => {
    setRealized(
      filterRealizedTrades(props.account, props.startDate, props.endDate)
    );

    setUnrealized(
      filterUnrealizedTrades(props.account, props.startDate, props.endDate)
    );
  }, [props]);

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

  const filterUnrealizedTrades = (account, start) => {
    // Filter by start and end dates selected
    const tradesInDateRange = props.trades.filter((trade) => {
      return trade.startdate.substring(0, 10) >= start;
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

  const realizedPL = () => {
    return realized.reduce((accumulator, trade) => {
      return accumulator + trade.value;
    }, 0);
  };

  const unrealizedPL = () => {
    return unrealized.reduce((accumulator, trade) => {
      return (accumulator += trade.value);
    }, 0);
  };

  const feesOpen = () => {
    return realized.reduce((accumulator, trade) => {
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
    return (realizedPL(props.account, start, end) / investment) * 100;
  };

  return (
    <div className="d-flex justify-content-evenly shadow p-2 my-3 bg-body rounded">
      <div className="d-flex flex-column align-items-center">
        <p>Return</p>
        <h5>
          {percReturn(props.account, props.startDate, props.endDate).toFixed(2)}
          %
        </h5>
      </div>
      <div className="d-flex flex-column align-items-center">
        <p>Realized P/L</p>
        <h5>${realizedPL().toFixed(2)}</h5>
      </div>
      <div className="d-flex flex-column align-items-center">
        <p>Fees/Comms</p>
        <h5>${feesOpen().toFixed(2)}</h5>
      </div>
      <div className="d-flex flex-column align-items-center">
        <p>Unrealized P/L</p>
        <h5>${unrealizedPL().toFixed(2)}</h5>
      </div>
      <div className="d-flex flex-column align-items-center">
        <p>Trades</p>
        <h5>
          {
            filterRealizedTrades(props.account, props.startDate, props.endDate)
              .length
          }
        </h5>
      </div>
    </div>
  );
};

export default AccountDetails;
