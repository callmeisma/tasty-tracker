import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import uniqid from "uniqid";
import Pagination from "./pagination-component";

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/transactions/")
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteTransaction = (id) => {
    axios
      .delete("http://localhost:5000/transactions/" + id)
      .then((res) => console.log(res.data));

    const updTransactions = transactions.filter((el) => el._id !== id);
    setTransactions(updTransactions);
  };

  const columns = [
    { dataField: "account", text: "Account" },
    { dataField: "date", text: "Date" },
    { dataField: "type", text: "Type" },
    { dataField: "action", text: "Action" },
    { dataField: "symbol", text: "Symbol" },
    { dataField: "instrument", text: "Instrument" },
    { dataField: "description", text: "Description" },
    { dataField: "value", text: "Value" },
    { dataField: "quantity", text: "Quantity" },
    { dataField: "avgprice", text: "Avg Price" },
    { dataField: "commissions", text: "Commissions" },
    { dataField: "fees", text: "Fees" },
    { dataField: "multiplier", text: "Multiplier" },
    { dataField: "rootsymbol", text: "Root Symbol" },
    { dataField: "underlyingsymbol", text: "Underlying Symbol" },
    { dataField: "expiration", text: "Expiration" },
    { dataField: "strike", text: "Strike" },
    { dataField: "callput", text: "C/P" },
    { dataField: "order", text: "Order" },
  ];

  // TODO connect pagination to transactions list

  return (
    <div className="p-3">
      <h3>Transactions</h3>
      <Pagination />
      <div className="table-responsive">
        <table className="table">
          <thead className="thead-light">
            <tr>
              {columns.map(function (col) {
                return (
                  <th id={col.dataField} key={col.dataField}>
                    {col.text}
                  </th>
                );
              })}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(function (transaction) {
              return (
                <tr id={transaction._id} key={uniqid()}>
                  <td key={uniqid()}>{transaction.account}</td>
                  <td key={uniqid()}>{transaction.date}</td>
                  <td key={uniqid()}>{transaction.type}</td>
                  <td key={uniqid()}>{transaction.action}</td>
                  <td key={uniqid()}>{transaction.symbol}</td>
                  <td key={uniqid()}>{transaction.instrument}</td>
                  <td key={uniqid()}>{transaction.description}</td>
                  <td key={uniqid()}>{transaction.value}</td>
                  <td key={uniqid()}>{transaction.avgprice}</td>
                  <td key={uniqid()}>{transaction.commissions}</td>
                  <td key={uniqid()}>{transaction.fees}</td>
                  <td key={uniqid()}>{transaction.multiplier}</td>
                  <td key={uniqid()}>{transaction.rootsymbol}</td>
                  <td key={uniqid()}>{transaction.rootsymbol}</td>
                  <td key={uniqid()}>{transaction.underlyingsymbol}</td>
                  <td key={uniqid()}>{transaction.expiration}</td>
                  <td key={uniqid()}>{transaction.strike}</td>
                  <td key={uniqid()}>{transaction.callput}</td>
                  <td key={uniqid()}>{transaction.order}</td>
                  <td key={uniqid()}>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="actions"
                    >
                      <Link
                        className=""
                        to={"/edit-transaction/" + transaction._id}
                      >
                        <button className="btn btn-primary nav-link">
                          <i className="bi bi-pen text-light"></i>
                        </button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        type="submit"
                        onClick={(e) => deleteTransaction(transaction._id)}
                      >
                        <i className="bi bi-x-circle icon-white"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;
