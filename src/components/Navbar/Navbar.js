import React, { Fragment } from "react";
import { Link } from "react-router-dom";
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
        <a
          className="navbar-brand"
          to="#"
        >
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
                <Tippy arrow={false} content="Home">
                  <button className="btn btn-sm btn-muted">
                    <FontAwesomeIcon id="home" icon={faHome}></FontAwesomeIcon>
                  </button>
                </Tippy>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">
                <Tippy arrow={false} content="Shop">
                  <button className="btn btn-sm btn-muted">
                    <FontAwesomeIcon
                      id="shop"
                      icon={faStoreAlt}
                    ></FontAwesomeIcon>
                  </button>
                </Tippy>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/shop/cart">
                <Tippy arrow={false} content="Cart">
                  <button className="btn btn-sm btn-muted">
                    <FontAwesomeIcon
                      id="cart"
                      icon={faShoppingCart}
                    ></FontAwesomeIcon>
                  </button>
                </Tippy>
                <span id="label" className="float-right badge badge-muted mt-1">
                  {currentUser.loggedIn && cart.quantity}
                </span>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/shop/list-products">
                <Tippy arrow={false} content="List Items">
                  <button className="btn btn-sm btn-muted">
                    <FontAwesomeIcon
                      id="user-listings"
                      icon={faTags}
                    ></FontAwesomeIcon>
                  </button>
                </Tippy>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/shop/user-listings">
                <Tippy arrow={false} content="Items by customers">
                  <button className="btn btn-sm btn-muted">
                    <FontAwesomeIcon id="sell" icon={faStore}></FontAwesomeIcon>
                  </button>
                </Tippy>
              </Link>
            </li>
          </ul>
          <ul id="auth" className="form-inline my-2 my-lg-0">
            {!currentUser.loggedIn && (
              <li>
                <Link className="nav-link" to="/auth/signin">
                  <Tippy arrow={false} content="Sign In">
                    <button className="btn btn-sm btn-muted">
                      <FontAwesomeIcon
                        id="signin"
                        icon={faSignIn}
                      ></FontAwesomeIcon>
                    </button>
                  </Tippy>
                </Link>
              </li>
            )}
            {!currentUser.loggedIn && (
              <li>
                <Link className="nav-link" to="/auth/signup">
                  <Tippy arrow={false} content="Sign Up">
                    <button className="btn btn-sm btn-muted">
                      <FontAwesomeIcon
                        id="signup"
                        icon={faUserPlus}
                      ></FontAwesomeIcon>
                    </button>
                  </Tippy>
                </Link>
              </li>
            )}
            {currentUser.loggedIn && (
              <li>
                <Link className="nav-link" to="/profile">
                  <Tippy arrow={false} content="Profile">
                    <button className="btn btn-sm btn-muted">
                      <FontAwesomeIcon
                        id="profile"
                        icon={faUser}
                      ></FontAwesomeIcon>
                    </button>
                  </Tippy>
                </Link>
              </li>
            )}
            {currentUser.loggedIn && (
              <li>
                <Link className="nav-link" to="." onClick={() => logOut()}>
                  <Tippy arrow={false} content="Sign Out">
                    <button className="btn btn-sm btn-muted">
                      <FontAwesomeIcon
                        id="signout"
                        icon={faSignOut}
                      ></FontAwesomeIcon>
                    </button>
                  </Tippy>
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
