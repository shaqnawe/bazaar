import React, { Fragment } from 'react';

const Loader = () => {
    return (
      <Fragment>
        <i
          id="spinner"
          className="fa fa-spinner fa-spin"
          style={{ fontSize: "5rem" }}
        ></i>
      </Fragment>
    );
};
export default Loader;