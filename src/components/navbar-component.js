import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav
      id="sidebarMenu"
      className="bg-light d-flex flex-col align-items-start px-auto"
    >
      <div className="position-sticky pt-3 px-2">
        <div className="m-auto d-flex justify-content-end">
          <i className="bi bi-arrow-left-square-fill"></i>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active d-flex justify-content-center align-items-center" aria-current="page" to="/">
              <i className="bi bi-house p-2"></i>
              <p className="p-0 m-auto">Dashboard</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link d-flex justify-content-center align-items-center" to="/trades">
              <i className="bi bi-boxes p-2"></i>
              <p className="p-0 m-auto">Trades</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link d-flex justify-content-center align-items-center" to="/transactions">
              <i className="bi bi-arrow-left-right p-2"></i>
              <p className="p-0 m-auto">Transactions</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link d-flex justify-content-center align-items-center" to="/accounts">
              <i className="bi bi-bank p-2"></i>
              <p className="p-0 m-auto">Accounts</p>
            </Link>
          </li>
        </ul>
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Add</span>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <Link className="nav-link d-flex justify-content-center align-items-center" to="/upload-transactions">
              <i className="bi bi-upload p-2"></i>
              <p className="p-0 m-auto">Upload CSV</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link d-flex justify-content-center align-items-center" to="/create-transaction">
              <i className="bi bi-plus-circle p-2"></i>
              <p className="p-0 m-auto">Transaction</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link d-flex justify-content-center align-items-center" to="/create-account">
              <i
                className="bi bi-plus-circle p-2"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              ></i>
              <p className="p-0 m-auto">Account</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
