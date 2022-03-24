import { loadStripe } from "@stripe/stripe-js";
import React, { Fragment } from "react";
import { useData } from '../../contexts/DataProvider';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }
  return stripePromise;
};

const CheckoutForm = (props) => {
  const { emptyCart } = useData();
  const cartItems = props.items;
//   console.log(cartItems);
  let lineItems = cartItems.items.map((product) => ({
    price: product.priceId,
    quantity: product.quantity,
    id: product.id,
  }));
  // console.log(lineItems)

  const checkoutOptions = {
    lineItems: lineItems.map(item => {
        return {
          price: item.price,
          quantity: item.quantity
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
    <Fragment>
      <h4>Checkout</h4>
      <div className="checkout">
        <h1>Stripe Checkout</h1>
        <p className="checkout-title">Design+Code React Hooks Course</p>
        <p className="checkout-description">
          Learn how to build a website with React Hooks
        </p>
        <h1 className="checkout-price">$19</h1>
        <img className="checkout-product-image" alt="Product" />
        <button className="checkout-button" onClick={redirectToCheckout}>
          <div className="grey-circle">
            <div className="purple-circle">
              <img className="icon" alt="credit-card-icon" />
            </div>
          </div>
          <div className="text-container">
            <p className="text">Buy</p>
          </div>
        </button>
      </div>
    </Fragment>
  );
};
export default CheckoutForm;
