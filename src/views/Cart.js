import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useData } from "../contexts/DataProvider";
import CartItem from "../components/Shop/CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const { cart } = useData();

  return (
    <Fragment>
      <div className="card shopping-cart mt-4">
        <div id="card-header" className="card-header">
          <FontAwesomeIcon
            id="cart-icon"
            className="btn"
            icon={faShoppingCart}
          ></FontAwesomeIcon>
          Shopping Cart
          <Link
            to="/shop"
            id="ctn-shop"
            className="btn btn-sm pull-right float-right"
          >
            Continue Shopping
          </Link>
          <div className="clearfix"></div>
        </div>
        <div className="card-body">
          {cart.items.map((item) => (
            <CartItem key={item.id} data={item} />
          ))}
        </div>
        <div className="card-footer">
          <div className="text-right">
            <div className="cart-totals">
              Subtotal: <b> {`$${(cart.subtotal / 100).toFixed(2)}`} </b>
            </div>
            <div className="cart-totals">
              Tax: <b>{`$${0}`}</b>
              {/* Tax: <b>{`$${ cart.tax }`}</b> */}
            </div>
            <div className="cart-totals">
              Grand total: <b>{`$${(cart.grandtotal / 100).toFixed(2)}`}</b>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <span className="float-right">
          <Link to="/shop/checkout">
            <input
              id="checkout-button"
              type="submit"
              className="btn"
              value="Checkout"
            />
          </Link>
        </span>
      </div>
    </Fragment>
  );
};
export default Cart;
