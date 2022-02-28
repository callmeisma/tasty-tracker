import React, { useState, useEffect } from "react";
import axios from "axios";

const EditAccount = (props) => {
  const [accountName, setAccountName] = useState("");
  const [startingBalance, setStartingBalance] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:4000/accounts/" + props.match.params.id)
      .then((response) => {
        setAccountName(response.data.account);
        setStartingBalance(response.data.startingBalance);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const account = {
      account: accountName,
      startingBalance: parseFloat(startingBalance),
    };

    axios
      .post(
        "http://localhost:4000/accounts/update/" + props.match.params.id,
        account
      )
      .then((res) => console.log(res.data));

    window.location = "/accounts";
  };

  return (
    <div>
      <h3>Edit Account</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label>Account: </label>
          <input
            type="text"
            required
            className="form-control"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Value: </label>
          <input
            required
            className="form-control"
            value={startingBalance}
            onChange={(e) => setStartingBalance(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Update Account Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
export default EditAccount;
