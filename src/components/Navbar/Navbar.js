import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faSignIn,
  faSignOut,
  faUserPlus,
  faHome,
  faStoreAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../contexts/DataProvider";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser, logOut } = useAuth();
  const { cart } = useData();

  return (
    <Fragment>
      <nav id="nav" className="navbar navbar-expand-sm navbar-dark bg-muted">
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
                <FontAwesomeIcon
                  id="home"
                  className="btn"
                  icon={faHome}
                ></FontAwesomeIcon>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">
                <FontAwesomeIcon
                  id="shop"
                  className="btn"
                  icon={faStoreAlt}
                ></FontAwesomeIcon>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/shop/cart">
                <FontAwesomeIcon
                  id="cart"
                  className="btn"
                  icon={faShoppingCart}
                ></FontAwesomeIcon>
                <span id="label" className="float-right badge badge-muted mt-1">
                  {currentUser.loggedIn && cart.quantity}
                </span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/sell">
                <span id="sell" className="material-icons">
                  sell
                </span>
              </Link>
            </li>
          </ul>
          <ul id="auth" className="form-inline my-2 my-lg-0">
            {!currentUser.loggedIn && (
              <li>
                <Link className="nav-link" to="/auth/signin">
                  <FontAwesomeIcon
                    id="signin"
                    icon={faSignIn}
                    className="btn"
                  ></FontAwesomeIcon>
                </Link>
              </li>
            )}
            {!currentUser.loggedIn && (
              <li>
                <Link className="nav-link" to="/auth/signup">
                  <FontAwesomeIcon
                    id="signup"
                    icon={faUserPlus}
                    className="btn"
                  ></FontAwesomeIcon>
                </Link>
              </li>
            )}
            {currentUser.loggedIn && (
              <li>
                <Link className="nav-link" to="/profile">
                  <FontAwesomeIcon
                    id="profile"
                    icon={faUser}
                    className="btn"
                  ></FontAwesomeIcon>
                </Link>
              </li>
            )}
            {currentUser.loggedIn && (
              <li>
                <Link className="nav-link" to="." onClick={() => logOut()}>
                  <FontAwesomeIcon
                    id="signout"
                    icon={faSignOut}
                    className="btn"
                  ></FontAwesomeIcon>
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
