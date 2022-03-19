import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
    return (
      <Fragment>
        <h1>The Payment was successful</h1>
        <Link to="/profile">Profile</Link>
      </Fragment>
    );
};
export default Success;