import React from "react";

function SignUp() {
  return (
    <main className="text-center">
      <form className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Register</h1>
        <label className="sr-only">First Name</label>
        <input
          type="text"
          id="firstName"
          className="form-control"
          placeholder="First Name"
          required
        />
        <label className="sr-only">Last Name</label>
        <input
          type="text"
          id="lastName"
          className="form-control"
          placeholder="Last Name"
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
        <div className="checkbox mb-3">
          <input type="checkbox" value="consent" />
          <label className="sr-only">
            I consent to Tasty Visualizer Terms and Conditions
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          CREATE MY ACCOUNT
        </button>
      </form>
    </main>
  );
}

export default SignUp;
