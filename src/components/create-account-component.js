import React, { useState } from "react";
import axios from "axios";

const CreateAccount = () => {
  const [accountName, setAccountName] = useState("");
  const [startingBalance, setStartingBalance] = useState(1);

  const onSubmit = (e) => {
    e.preventDefault();

    const account = {
      account: accountName,
      startingBalance: startingBalance,
    };

    axios
      .post("http://localhost:5000/accounts/add", account)
      .then((res) => console.log(res.data));

    window.location = "/accounts";
  };

  return (
    <div className="shadow p-3 mb-5 bg-body rounded p-3">
      <h3>Create New Account</h3>
      <form className="m-3 w-75" onSubmit={(e) => onSubmit(e)}>
        <div className="input-group mb-3">
          <label htmlFor="accountName" className="input-group-text">
            Account Name:
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="accountName"
            placeholder="account name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="balance" className="input-group-text">
            Start Balance:
          </label>
          <input
            type="number"
            id="balance"
            className="form-control"
            value={startingBalance}
            onChange={(e) => setStartingBalance(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateAccount;
