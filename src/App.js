import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/auth-context";
import Home from "./views/Home";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Profile from "./views/Profile";
import Shop from './views/Shop';
import Cart from './views/Cart';
import Footer from "./components/Footer/Footer";
import Checkout from "./views/Checkout";
import Unauthorized from "./views/Unauthorized";
import Success from "./components/Checkout/Success";
import Cancel from "./components/Checkout/Cancel";
import Orders from "./views/Orders";
import "@stripe/stripe-js";

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
          {currentUser.loggedIn && (
            <Route exact path="/profile" element={<Profile />} />
          )}
          {!currentUser.loggedIn && (
            <Route
              exact
              path="/profile"
              element={<Navigate to="/auth/signin" />}
            />
          )}
          {currentUser.loggedIn && (
            <Route exact path="/shop" element={<Shop />} />
          )}
          {currentUser.loggedIn && (
            <Route exact path="/shop/cart" element={<Cart />} />
          )}
          {currentUser.loggedIn && (
            <Route exact path="/shop/checkout" element={<Checkout />} />
          )}
          {currentUser.loggedIn && <Route exact path="/profile/orders" element={<Orders />} />}
          <Route exact path="/success" element={<Success />} />
          <Route exact path="/cancel" element={<Cancel />} />
          <Route exact path="/unauthorized" element={<Unauthorized />} />
          <Route exact path="*" element={<Navigate to="/unauthorized" />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};

export default App;
