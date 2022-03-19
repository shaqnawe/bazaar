import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <Fragment>
      <h1>The Payment was cancelled.</h1>
      <Link to="/profile">Profile</Link>
    </Fragment>
  );
};
export default Cancel;