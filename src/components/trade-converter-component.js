import uniqid from "uniqid";

const TradeConverter = (transactions) => {
  //   Filter by open transactions
  const openTransactions = transactions.filter(
    (transaction) => transaction.action.slice(-4) === "OPEN"
  );
  //   Filter by open transactions
  const closeTransactions = transactions.filter(
    (transaction) => transaction.action.slice(-5) === "CLOSE"
  );

  const createTrades = () => {
    let trades = [];
    const openTransactionsOrdersArr = Object.keys(openTransactions).map(
      (transaction) => {
        return openTransactions[transaction].order;
      }
    );

    const openTransactionsOrders = [...new Set(openTransactionsOrdersArr)];

    for (let i = 0; i < openTransactionsOrders.length; i++) {
      let tradeStart = {
        id: uniqid(),
        openOrder: openTransactionsOrders[i],
        commissions: 0,
        fees: 0,
        transactions: [],
        value: 0,
        pairs: [],
      };
      trades.push(tradeStart);
    }
    return trades;
  };

  const placeOpenTransactions = (trades) => {
    for (let i = 0; i < openTransactions.length; i++) {
      for (let j = 0; j < trades.length; j++) {
        if (openTransactions[i].order === trades[j].openOrder) {
          trades[j].account = openTransactions[i].account;
          trades[j].startdate = openTransactions[i].date;
          trades[j].value += openTransactions[i].value;
          trades[j].commissions += openTransactions[i].commissions;
          trades[j].fees += openTransactions[i].fees;
          trades[j].symbol = openTransactions[i].symbol.match(/^\w+/g)[0];
          trades[j].pairs.push(openTransactions[i].symbol);
          trades[j].transactions.push(openTransactions[i]);
        }
        trades[j].pairs = [...new Set(trades[j].pairs)];
      }
    }
    return trades;
  };

  const closeTrades = (trades) => {
    for (let i = 0; i < closeTransactions.length; i++) {
      for (let j = 0; j < trades.length; j++) {
        for (let k = 0; k < trades[j].pairs.length; k++) {
          if (
            closeTransactions[i].symbol === trades[j].pairs[k] &&
            closeTransactions[i].strikeprice ===
              trades[j].transactions[k].strikeprice &&
            closeTransactions[i].expiration ===
              trades[j].transactions[k].expiration &&
            closeTransactions[i].callput === trades[j].transactions[k].callput
          ) {
            trades[j].transactions.push(closeTransactions[i]);
            trades[j].enddate = closeTransactions[i].date;
            trades[j].commissions += closeTransactions[i].commissions;
            trades[j].fees += closeTransactions[i].fees;
            trades[j].value += closeTransactions[i].value;
          }
        }
      }
    }
    return trades;
  };

  const newTrades = createTrades();
  const openTrades = placeOpenTransactions(newTrades);
  const result = closeTrades(openTrades);

  return result;
};

export default TradeConverter;
