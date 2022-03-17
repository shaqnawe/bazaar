import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser, logOut } = useAuth();
  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm navbar-light bg-muted">
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
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                to="#"
                id="dropdownId"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownId">
                <a className="dropdown-item" to="#">
                  Action 1
                </a>
                <a className="dropdown-item" to="#">
                  Action 2
                </a>
              </div>
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
                <Link className="nav-link" to="." onClick={()=>logOut()}>
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
