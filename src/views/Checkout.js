import React, { Fragment } from "react";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import { useData } from "../contexts/DataProvider";

const Checkout = () => {
  const { cart } = useData();
  return (
    <Fragment>
      <CheckoutForm items={cart} />
    </Fragment>
  );
};
export default Checkout;
