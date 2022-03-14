import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import Home from "./components/home";
import Navbar from "./components/navbar-component";
import AccountsList from "./components/account-list-component";
import TransactionsList from "./components/transactions-list-component";
import EditAccount from "./components/edit-account-component";
import EditTransaction from "./components/edit-transaction-component";
import CreateTransaction from "./components/create-transaction-component";
import CreateAccount from "./components/create-account-component";
import Header from "./components/header-component";
import UploadTransactions from "./components/upload-transactions-component";
import TradesList from "./components/trades-list-component";
import TradeConverter from "./components/trade-converter-component";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/transactions/")
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:4000/accounts/")
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setTrades(TradeConverter(transactions));
  }, [transactions]);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Navbar />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <Route
                path="/"
                exact
                render={() => (
                  <Home
                    accounts={accounts}
                    trades={trades}
                    transactions={transactions}
                  />
                )}
              />
              <Route
                path="/accounts"
                exact
                render={() => (
                  <AccountsList
                    accounts={accounts}
                    setAccounts={setAccounts}
                    transactions={transactions}
                  />
                )}
              />
              <Route
                path="/transactions"
                exact
                render={() => (
                  <TransactionsList
                    transactions={transactions}
                    setTransactions={setTransactions}
                  />
                )}
              />
              <Route
                path="/trades"
                exact
                render={() => <TradesList trades={trades} />}
              />
              <Route
                path="/edit-transaction/:id"
                exact
                component={EditTransaction}
              />
              <Route path="/edit-account/:id" exact component={EditAccount} />
              <Route
                path="/create-transaction"
                exact
                component={CreateTransaction}
              />
              <Route path="/create-account" exact component={CreateAccount} />
              <Route
                path="/upload-transactions"
                exact
                component={UploadTransactions}
              />
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
