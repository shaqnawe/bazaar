import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../contexts/DataProvider";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser, logOut } = useAuth();
  const { cart } = useData();
  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <a className="navbar-brand" to="#">
          Bazaar
        </a>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0 c">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">
                Shop
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/shop/cart">
                <FontAwesomeIcon id="cart" className="btn btn-muted" icon={faShoppingCart}>Cart</FontAwesomeIcon>
                <span id="label" className="float-right badge badge-muted m-1">
                  {cart.quantity}
                </span>
              </Link>
            </li>
          </ul>
          <ul id="auth" className="form-inline my-2 my-lg-0">
            {!currentUser.loggedIn && (
              <li>
                <Link className="nav-link" to="/auth/signin">
                  Sign In
                </Link>
              </li>
            )}
            {!currentUser.loggedIn && (
              <li>
                <Link className="nav-link" to="/auth/signup">
                  Sign Up
                </Link>
              </li>
            )}
            {currentUser.loggedIn && (
              <li>
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            )}
            {currentUser.loggedIn && (
              <li>
                <Link className="nav-link" to="." onClick={() => logOut()}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
