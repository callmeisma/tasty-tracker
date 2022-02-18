import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
import OptionTransform from "./components/option-tranform-component";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Navbar />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <Route path="/" exact component={Home} />
              <Route path="/accounts" exact component={AccountsList} />
              <Route path="/transactions" exact component={TransactionsList} />
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
              <Route
                path="/option-transform"
                exact
                component={OptionTransform}
              />
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
