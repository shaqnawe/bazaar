import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./components/Auth/Routing/RequireAuth";
import Home from "./views/Home";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Profile from "./views/Profile";
import Shop from "./views/Shop";
import Cart from "./views/Cart";
import UserListings from "./views/UserListings";
import ListProducts from "./views/ListProducts";
import Footer from "./components/Footer/Footer";
import Checkout from "./views/Checkout";
import Unauthorized from "./views/Unauthorized";
import Success from "./components/Checkout/Success";
import Cancel from "./components/Checkout/Cancel";
import Orders from "./views/Orders";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import "@stripe/stripe-js";
import { useAuth } from "./contexts/auth-context";

const App = () => {
  const { currentUser } = useAuth();
  return (
    <Fragment>
      <header>
        <Navbar />
      </header>
      <main className="container text-center">
        <Routes>
          <Route exact path="/" element={<Home />} />
          {!currentUser.loggedIn && (
            <Route exact path="/auth/signin" element={<SignIn />} />
          )}
          {!currentUser.loggedIn && (
            <Route exact path="/auth/signup" element={<SignUp />} />
          )}
          <Route exact path="*" element={<Unauthorized />} />
          <Route
            exact
            path="/auth/reset-password"
            element={<ResetPassword />}
          />
          <Route
            exact
            path="/auth/forgot-password"
            element={<ForgotPassword />}
          />
          <Route element={<RequireAuth />}>
            {currentUser.loggedIn && (
              <Route exact path="/profile" element={<Profile />} />
            )}
            {currentUser.loggedIn && (
              <Route exact path="/shop" element={<Shop />} />
            )}
            {currentUser.loggedIn && (
              <Route exact path="/shop/cart" element={<Cart />} />
            )}
            {currentUser.loggedIn && (
              <Route exact path="/profile/orders" element={<Orders />} />
            )}
            {currentUser.loggedIn && (
              <Route exact path="/shop/checkout" element={<Checkout />} />
            )}
            <Route
              exact
              path="/auth/signup"
              element={<Navigate to="/profile" />}
            />
            <Route
              exact
              path="/auth/signin"
              element={<Navigate to="/profile" />}
            />
            {currentUser.loggedIn && (
              <Route
                exact
                path="/shop/list-products"
                element={<ListProducts />}
              />
            )}
            {currentUser.loggedIn && (
              <Route
                exact
                path="/shop/user-listings"
                element={<UserListings />}
              />
            )}
            {currentUser.loggedIn && (
              <Route exact path="/success" element={<Success />} />
            )}
            {currentUser.loggedIn && (
              <Route exact path="/cancel" element={<Cancel />} />
            )}
          </Route>
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};

export default App;
