import React from "react";
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
      if (props.transactions[i].account === account) {
        result += props.transactions[i].value;
      }
    }
    return result.toFixed(2);
  };

  const getFees = (account) => {
    let result = 0;

    for (let i = 0; i < props.transactions.length; i++) {
      if (props.transactions[i].account === account) {
        result += props.transactions[i].fees;
      }
    }
    return result.toFixed(3);
  };

  const getCommissions = (account) => {
    let result = 0;

    for (let i = 0; i < props.transactions.length; i++) {
      if (
        props.transactions[i].account === account &&
        props.transactions.commissions !== "--"
      ) {
        result += props.transactions[i].commissions;
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
      if (trades[i].commissions !== "--") {
        result += trades[i].value;
        result += trades[i].commissions;
        result += trades[i].fees;
      }
    }
    return result.toFixed(2);
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center pb-3">
        <h3 className="my-auto">Accounts ({props.accounts.length})</h3>
      </div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th key="account">Account</th>
            <th key="startBalance">Start Balance</th>
            <th key="commissions">Commissions</th>
            <th key="fees">Fees</th>
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
                <td key={uniqid()}>{getCommissions(account.account)}</td>
                <td key={uniqid()}>{getFees(account.account)}</td>
                <td key={uniqid()}>
                  ${getBalance(account.account, account.startingBalance)}
                </td>
                <td key={uniqid()}>${getProfitloss(account.account)}</td>
                <td key={account.account + "action"}>
                  <div className="btn-group">
                    <button className="btn btn-primary">
                      <Link to={"/edit-account/" + account._id}>
                        <i className="bi bi-pen text-light"></i>
                      </Link>
                    </button>
                    <button
                      onClick={() => {
                        deleteAccount(account._id);
                      }}
                      className="btn btn-outline-danger"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
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
