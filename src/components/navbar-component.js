/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <div className="m-auto d-flex justify-content-end">
          <i className="bi bi-arrow-left-square-fill"></i>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              <i className="bi bi-house p-2"></i>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/trades">
              <i className="bi bi-boxes p-2"></i>
              Trades
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/transactions">
              <i className="bi bi-arrow-left-right p-2"></i>
              Transactions
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/accounts">
              <i className="bi bi-bank p-2"></i>
              Accounts
            </Link>
          </li>
        </ul>
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Add</span>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <Link className="nav-link" to="/upload-transactions">
              <i className="bi bi-upload p-2"></i>
              Upload CSV
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create-transaction">
              <i className="bi bi-plus-circle p-2"></i>
              Transaction
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create-account">
              <i
                className="bi bi-plus-circle p-2"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              ></i>
              Account
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
