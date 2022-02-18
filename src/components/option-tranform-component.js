import React, { useState, useEffect } from "react";
import axios from "axios";

const OptionTransform = () => {
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

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

export default OptionTransform;
