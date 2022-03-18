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
import Unauthorized from "./views/Unauthorized";

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
          {!currentUser.loggedIn && <Route exact path="/auth/signin" element={<SignIn />} />}
          {!currentUser.loggedIn && <Route exact path="/auth/signup" element={<SignUp />} />}
          {currentUser.loggedIn && <Route exact path="/profile" element={<Profile />} />}
          {!currentUser.loggedIn && (
            <Route exact path="/profile" element={<Navigate to="/auth/signin" />} />
          )}
          {currentUser.loggedIn && <Route exact path="/shop" element={<Shop />} />}
          {currentUser.loggedIn && <Route exact path="/shop/cart" element={< Cart />} />}
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
