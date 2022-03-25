import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../contexts/DataProvider";
import { Heading } from "@chakra-ui/react";

const Success = () => {
  const { emptyCart, getCart } = useData();
  useEffect(() => {
    emptyCart();
    getCart();
  });

  return (
    <Fragment>
      <Heading m={4}>
        <span id="payment-success">The Payment was successful</span>
      </Heading>
      <Link to="/profile">Profile</Link>
    </Fragment>
  );
};
export default Success;