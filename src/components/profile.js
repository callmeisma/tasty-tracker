import React from "react";

const Profile = (props) => {
  return (
    <div className="shadow p-3 mb-5 bg-body rounded p-3">
      <h3>Profile</h3>
      <form className="m-3 w-75">
        <div className="input-group mb-3">
          <label htmlFor="profileName" className="input-group-text">
            Name:
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="profileName"
            placeholder="account name"
            value={props.user}
            // onChange={(e) => setProfileName(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="profileEmail" className="input-group-text">
            Email:
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="profileEmail"
            placeholder="profile email"
            value={props.email}
            // onChange={(e) => setProfileEmail(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <label htmlFor="profilePassword" className="input-group-text">
            Password:
          </label>
          <input
            type="number"
            id="profilePassword"
            className="form-control"
            value={props.password}
            // onChange={(e) => setProfilePassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-danger">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Profile;
