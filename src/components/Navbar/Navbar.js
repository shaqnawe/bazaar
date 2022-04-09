import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faSignIn,
  faSignOut,
  faUserPlus,
  faHome,
  faStoreAlt,
  faStore,
  faTags,
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
              <NavLink className="nav-link" to="/">
                <Tippy content="Home">
                  <button className="btn btn-sm btn-muted">
                    <FontAwesomeIcon id="home" icon={faHome}></FontAwesomeIcon>
                  </button>
                </Tippy>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/shop">
                <Tippy content="Shop">
                  <button className="btn btn-sm btn-muted">
                    <FontAwesomeIcon
                      id="shop"
                      icon={faStoreAlt}
                    ></FontAwesomeIcon>
                  </button>
                </Tippy>
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink to="/shop/cart">
                <Tippy content="Cart">
                  <button className="btn btn-sm btn-muted">
                    <FontAwesomeIcon
                      id="cart"
                      icon={faShoppingCart}
                    ></FontAwesomeIcon>
                  </button>
                </Tippy>
                <Tippy
                
                  content={`${cart.quantity}` + " items in cart"}
                >
                  <span
                    id="label"
                    className="float-right badge badge-muted mt-1"
                  >
                    {currentUser.loggedIn && cart.quantity}
                  </span>
                </Tippy>
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink to="/shop/list-products">
                <Tippy content="Sell on bazaar">
                  <button className="btn btn-sm btn-muted">
                    <FontAwesomeIcon
                      id="user-listings"
                      icon={faTags}
                    ></FontAwesomeIcon>
                  </button>
                </Tippy>
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink to="/shop/user-listings">
                <Tippy content="Items by Customers">
                  <button className="btn btn-sm btn-muted">
                    <FontAwesomeIcon id="sell" icon={faStore}></FontAwesomeIcon>
                  </button>
                </Tippy>
              </NavLink>
            </li>
          </ul>
          <ul id="auth" className="form-inline my-2 my-lg-0">
            {!currentUser.loggedIn && (
              <li>
                <NavLink className="nav-link" to="/auth/signin">
                  <Tippy content="Sign In">
                    <button className="btn btn-sm btn-muted">
                      <FontAwesomeIcon
                        id="signin"
                        icon={faSignIn}
                      ></FontAwesomeIcon>
                    </button>
                  </Tippy>
                </NavLink>
              </li>
            )}
            {!currentUser.loggedIn && (
              <li>
                <NavLink className="nav-link" to="/auth/signup">
                  <Tippy content="Sign Up">
                    <button className="btn btn-sm btn-muted">
                      <FontAwesomeIcon
                        id="signup"
                        icon={faUserPlus}
                      ></FontAwesomeIcon>
                    </button>
                  </Tippy>
                </NavLink>
              </li>
            )}
            {currentUser.loggedIn && (
              <li>
                <NavLink className="nav-link" to="/profile">
                  <Tippy content="Profile">
                    <button className="btn btn-sm btn-muted">
                      <FontAwesomeIcon
                        id="profile"
                        icon={faUser}
                      ></FontAwesomeIcon>
                    </button>
                  </Tippy>
                </NavLink>
              </li>
            )}
            {currentUser.loggedIn && (
              <li>
                <NavLink className="nav-link" to="." onClick={() => logOut()}>
                  <Tippy content="Sign Out">
                    <button className="btn btn-sm btn-muted">
                      <FontAwesomeIcon
                        id="signout"
                        icon={faSignOut}
                      ></FontAwesomeIcon>
                    </button>
                  </Tippy>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
