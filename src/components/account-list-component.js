import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AccountsList = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/accounts/")
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteAccount = (id) => {
    axios
      .delete("http://localhost:5000/accounts/" + id)
      .then((res) => console.log(res.data));

    const updAccounts = accounts.filter((el) => el._id !== id);
    setAccounts(updAccounts);
  };

  return (
    <div>
      <h3>Accounts</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Account</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(function (account) {
            return (
              <tr>
                <td>{account.account}</td>
                <td>{account.startingBalance}</td>
                <td>
                  <Link to={"/edit-account/" + account._id}>edit</Link>
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
