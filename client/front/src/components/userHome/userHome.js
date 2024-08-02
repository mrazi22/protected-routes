import React from "react";
import "../signup_component/signup.css"


export default function UserHome({ userData }) {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div>
          Name<h1>{userData.fname} </h1>
          Email <h1>{userData.email}</h1>
          <br />
          <button onClick={logOut} className="btn ">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}