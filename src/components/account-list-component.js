import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import uniqid from "uniqid";

const AccountsList = (props) => {
  const deleteAccount = (id) => {
    axios
      .delete("http://localhost:4000/accounts/" + id)
      .then((res) => console.log(res.data));

    const updAccounts = props.accounts.filter((el) => el._id !== id);
    props.setAccounts(updAccounts);
  };

  const getBalance = (account, startingBalance) => {
    let result = startingBalance;

    for (let i = 0; i < props.transactions.length; i++) {
      if (
        props.transactions[i].commissions !== "--" &&
        props.transactions[i].account === account
      ) {
        result +=
          props.transactions[i].value +
          props.transactions[i].commissions +
          props.transactions[i].fees;
      }
    }
    return result.toFixed(2);
  };

  const getProfitloss = (account) => {
    let result = 0;

    const trades = props.transactions.filter(
      (transaction) =>
        transaction.type === "Trade" && transaction.account === account
    );

    for (let i = 0; i < trades.length; i++) {
      if (props.transactions[i].commissions !== "--") {
        result +=
          props.transactions[i].value +
          props.transactions[i].commissions +
          props.transactions[i].fees;
      }
    }
    return result.toFixed(2);
  };

  return (
    <div className="p-3">
      <h3>Accounts</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th key="account">Account</th>
            <th key="startBalance">Start Balance</th>
            <th key="balance">Balance</th>
            <th key="profitloss">P/L</th>
            <th key="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.accounts.map(function (account) {
            return (
              <tr key={account._id}>
                <td key={account.account}>{account.account}</td>
                <td key={account.startingBalance}>{account.startingBalance}</td>
                <td key={uniqid()}>
                  ${getBalance(account.account, account.startingBalance)}
                </td>
                <td key={uniqid()}>${getProfitloss(account.account)}</td>
                <td key={account.account + "action"}>
                  <button>
                    <Link to={"/edit-account/" + account._id}>edit</Link>
                  </button>
                  <button
                    onClick={() => {
                      deleteAccount(account._id);
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsList;
