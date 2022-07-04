import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const userStatus = () => {
    if (props.user === undefined) {
      return (
        <div className="d-flex">
          <Link
            to="/sign-up"
            className="nav-link text-white px-3 py-0 header-link"
          >
            Sign Up
          </Link>
          <Link
            to="/sign-in"
            className="nav-link text-white px-3 py-0 header-link"
          >
            Sign In
          </Link>
        </div>
      );
    } else {
      return (
        <div className="navbar-nav ">
          <div className="nav-item text-nowrap d-flex">
            <Link
              to="/profile"
              className="nav-link text-white px-3 py-0 header-link"
            >
              {props.user}
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-2 shadow">
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand col-md-3 col-lg-2 d-flex align-items-center py-0 justify-content-center"
        >
          <i className="bi bi-piggy-bank text-white px-3 m-0 fs-4"></i>
          <h1 className="fs-4 m-0">
            Tasty<span className="text-danger">Tracker</span>
          </h1>
        </Link>
        <div className="d-flex">
          <button
            className="navbar-toggler d-md-none collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {userStatus()}
        </div>
      </div>
    </nav>
  );
};
export default Header;
