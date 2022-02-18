/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-2 shadow">
        <Link to="/" className="navbar-brand col-md-3 col-lg-2 me-0 px-3">
          TastyTracker
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
          <div className="navbar-nav">
            <div className="nav-item text-nowrap">
              <a className="nav-link px-3" href="#">
                Sign out
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
