import React from "react";
import SignInSvg from "../images/signIn.svg";

function SignIn() {
  return (
    <main className="h-100 d-flex flex-wrap justify-content-center align-items-center">
      <img src={SignInSvg} className="w-25 m-5" alt="sign-in illustration" />
      <form className="d-flex flex-column m-5">
        <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
        <label className="sr-only">Email</label>
        <input
          type="email"
          r
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
          SIGN IN
        </button>
      </form>
    </main>
  );
}

export default SignIn;
