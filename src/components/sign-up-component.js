import React from "react";
import SignUpSvg from "../images/signUp.svg";

function SignUp() {
  return (
    <main className="h-100 d-flex flex-wrap justify-content-center align-items-center">
      <img src={SignUpSvg} className="w-25 m-5" alt="sign-in illustration" />
      <form className="d-flex flex-column m-5">
        <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
        <label className="sr-only">Name</label>
        <input
          type="text"
          id="name"
          className="form-control"
          placeholder="Name"
          required
        />
        <label className="sr-only">Email</label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email"
          required
        />
        <label className="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
        />
        <button className="btn btn-lg btn-danger btn-block my-2" type="submit">
          CREATE MY ACCOUNT
        </button>
      </form>
    </main>
  );
}

export default SignUp;
