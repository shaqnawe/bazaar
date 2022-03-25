import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../contexts/DataProvider";

const Success = () => {
  const { emptyCart, getCart } = useData();
  useEffect(() => {
    emptyCart();
    getCart();
  });

  return (
    <Fragment>
      <h1>The Payment was successful</h1>
      <Link to="/profile">Profile</Link>
    </Fragment>
  );
};
export default Success;