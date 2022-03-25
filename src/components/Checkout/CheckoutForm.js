import React, { Fragment } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useData } from "../../contexts/DataProvider";
import { Heading } from "@chakra-ui/react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }
  return stripePromise;
};

const CheckoutForm = (props) => {
  const { copyCart } = useData();
  const cartItems = props.items;
  //   console.log(cartItems);
  let lineItems = cartItems.items.map((product) => ({
    price: product.priceId,
    quantity: product.quantity,
    id: product.id,
  }));
  // console.log(lineItems)
  // Get all cart items and pass them to copyCart function to
  // make a new collection or add quantity to existing refrence
  for (let item of cartItems.items) {
    console.log(item.id);
    copyCart(item);
  }
  const checkoutOptions = {
    lineItems: lineItems.map((item) => {
      return {
        price: item.price,
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
  };

  const redirectToCheckout = async () => {
    console.log("Payment Submit Handler");
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);
  };

  return (
    <div className="align-content-center mt-5">
      <Heading m={4}>
        <span id="stripe-checkout">Stripe Checkout</span>
      </Heading>
      <div className="checkout mt-5">
        <div>
          <Tippy content="Pay with Card">
            <button className="btn btn-sm btn-muted">
              <FontAwesomeIcon
                id="credit-card"
                icon={faCreditCard}
              ></FontAwesomeIcon>
            </button>
          </Tippy>
        </div>
        <button className="checkout-button" onClick={redirectToCheckout}>
          <button id="checkout-btn" className="btn">
            Continue to Checkout
          </button>
        </button>
      </div>
    </div>
  );
};
export default CheckoutForm;
