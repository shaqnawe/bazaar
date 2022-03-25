import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Heading } from '@chakra-ui/react';

const Cancel = () => {
  return (
    <Fragment>
      <Heading m={4}>
        <span id="payment-cancel">The Payment was cancelled.</span>
      </Heading>
      <Link to="/profile">
        <button className="btn btn-muted text-warning">Profile</button>
      </Link>
    </Fragment>
  );
};
export default Cancel;