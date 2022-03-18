import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <Fragment>
      <div id="not-found" className="row align-items-center mt-4">
        <h1 id="unauthorized">You are unauthorized to view this page.</h1>
        <h4 id="err">
          Please{" "}
          <span>
            <Link className="notify" to="/auth/signin">Login</Link>
          </span>{" "}
          or{" "}
          <span>
            <Link className="notify" to="/auth/signin">Register</Link>
          </span>{" "}
          to continue.
        </h4>
      </div>
    </Fragment>
  );
};
export default Unauthorized;