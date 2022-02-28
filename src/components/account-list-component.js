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
  
  return (
    <div>
      <h3>Accounts</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th key="account">Account</th>
            <th key="starting-balance">Starting Balance</th>
            <th key="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.accounts.map(function (account) {
            return (
              <tr key={account._id}>
                <td key={account.account}>{account.account}</td>
                <td key={uniqid()}>{account.startingBalance}</td>
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
