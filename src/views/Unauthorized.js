import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

const Unauthorized = () => {
  return (
    <Fragment>
      <div id="not-found" className="row align-items-center mt-4">
        <Heading m={4}>
          <span id="unauthorized">You are unauthorized to view this page.</span>
        </Heading>
        <h4 id="err">
          Please{" "}
          <span>
            <Link className="notify" to="/auth/signin">
              Login
            </Link>
          </span>{" "}
          or{" "}
          <span>
            <Link className="notify" to="/auth/signin">
              Register
            </Link>
          </span>{" "}
          to continue.
        </h4>
      </div>
    </Fragment>
  );
};
export default Unauthorized;