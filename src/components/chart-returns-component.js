import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const ChartReturns = (props) => {
  const [months, setMonths] = useState([]);
  const [balances, setBalances] = useState([]);
  const [tableArray, setTableArray] = useState([]);

  const getMonths = (transactions) => {
    const dateList = [];
    transactions.map((transaction) =>
      dateList.push(transaction.date.substring(0, 7))
    );
    setMonths(dateList);
  };

  const getReturns = (transactions, month) => {
    const dateTrans = transactions.filter(
      (transaction) => transaction.date.substring(0, 7) === month
    );
    let returnTotal = 0;
    dateTrans.map(
      (dateTran) =>
        (returnTotal += dateTran.value + dateTran.fees + dateTran.commissions)
    );

    return returnTotal;
  };

  const x = [
    { date: "2021-11", balance: 0 },
    { date: "2021-12", balance: 10 },
    { date: "2022-01", balance: 50 },
  ];

  const tableData = () => {
    const balanceList = [];
    for (let i = 0; i < months.length; i++) {
      const gains = getReturns(props.transactions, months[i]);
      balanceList.push({ date: months[i].substring(2, 7), balance: gains });
    }
    setBalances(balanceList);
  };

  useEffect(() => {
    getMonths(props.transactions);
    tableData();
  }, [props]);

  return (
    <div className="shadow p-3 mb-5 bg-body rounded">
      <LineChart
        width={600}
        height={300}
        data={balances}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="balance" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default ChartReturns;
