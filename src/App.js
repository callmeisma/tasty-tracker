import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/header-component";
import Welcome from "./components/welcome";
import SignUp from "./components/sign-up-component";
import SignIn from "./components/sign-in";

import TradeConverter from "./components/trade-converter-component";
import Profile from "./components/profile";
import Home from "./components/home";
import Navbar from "./components/navbar-component";
import AccountsList from "./components/account-list-component";
import TransactionsList from "./components/transactions-list-component";
import EditAccount from "./components/edit-account-component";
import EditTransaction from "./components/edit-transaction-component";
import CreateTransaction from "./components/create-transaction-component";
import CreateAccount from "./components/create-account-component";
import UploadTransactions from "./components/upload-transactions-component";
import TradesList from "./components/trades-list-component";

import SampleData from "./components/sample-data"

function App() {
  const [accounts, setAccounts] = useState([SampleData.account]);
  const [transactions, setTransactions] = useState(SampleData.transactions);
  const [trades, setTrades] = useState([]);
  const [user, setUser] = useState("userA");

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
    if (transactions !== undefined) {
      setTrades(TradeConverter(transactions));
    }
  }, [transactions]);

  const viewMode = () => {
    if (user) {
      return (
        <div className="d-flex flex-column min-vh-100">
          <div className="d-flex">
            <Navbar />
            <main className="d-flex w-100">
              <Route
                path="/profile"
                exact
                render={() => <Profile user={user} />}
              />
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
                render={() => (
                  <UploadTransactions
                    transactions={transactions}
                    setTransactions={setTransactions}
                  />
                )}
              />
              {/* Redirect GH Pages load url to home */}
              <Route path="/tasty-tracker" exact component={Home} />
            </main>
          </div>
          <footer className="d-flex align-items-center justify-content-center mt-auto">
              <p className="m-0 p-2">Copyright © Ismael Fernandez</p>
              <a href="https://github.com/callmeisma/tasty-tracker" target="_blank" rel="noreferrer">
                <i className="fab fa-github" aria-hidden="true"></i>
              </a>
            </footer>
        </div>
      );
    } else {
      return (
        <div className="flex-fill justify-contents-center align-items-center bg-light bg-gradient text-dark">
          <Route path="/" exact component={Welcome} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/tasty-tracker" exact component={Welcome} />
        </div>
      );
    }
  };

  return (
    <Router>
      <div className="App d-flex flex-column">
        <Header user={user} setUser={setUser}/>
        {viewMode()}
      </div>
    </Router>
  );
}

export default App;
