import React from "react";
import { Link } from "react-router-dom";
import WelcomeSvg from "../images/welcome.svg";

function Welcome() {
  return (
    <main className="h-100 d-flex flex-wrap justify-content-evenly align-items-center">
      <div className="d-flex flex-column">
        <div>
          <h1 className="m-auto text-uppercase fs-1 fw-bold">
            Got Tasty Trades?
          </h1>
          <h1 className="m-auto text-uppercase fs-1 fw-bolder text-danger">
            Tasty Track it!
            <i className="bi bi-piggy-bank text-danger m-auto fs-1 ps-3"></i>
          </h1>
          <p className="small">Made with M.E.R.N. Stack</p>
        </div>
        <div className="d-flex flex-column py-3">
          <p className="m-auto">
            Welcome to the <b>tastier</b> way to <b>track</b> and study your
            portfolio,
          </p>
          <div>
            When you join tastytracker, you can:
            <ul>
              <li>
                <b>Store</b> your transactions
              </li>
              <li>
                <b>View, Edit, and Filter</b> all transactions and trades
              </li>
              <li>
                Quickly get biggest <b>winners and lossers</b>
              </li>
              <li>
                Know your history of <b>returns</b>
              </li>
              <li>
                <b>Compare</b> goals to reality
              </li>
            </ul>
          </div>
          <Link to="/sign-up">
            <button className="btn btn-danger text-uppercase p-3 w-50 m-auto">
              sign up for free!
            </button>
          </Link>
        </div>
      </div>
      <img src={WelcomeSvg} className="w-50 m-5" alt="sign-in illustration" />
    </main>
  );
}

export default Welcome;
