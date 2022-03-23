import './Auth.css';
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import React, { Fragment, useRef, useState } from "react";
import { Button, Card, Form, Alert } from "react-bootstrap";

const Signup = () => {
  const userFNameRef = useRef();
  const userLNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { currentUser, signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredFName = userFNameRef.current.value;
    const enteredLName = userLNameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPass = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;
    // Check if the passwords are the same
    if (enteredPass !== enteredConfirmPassword){
      return setError("Passwords do not match!")
    }
    try {
      setLoading(true)
      signUp(enteredEmail, enteredPass);
    } catch {
        setError("There was a problem creating the account")
    }
    setLoading(false);
  };

  return (
    <Fragment>
        <Card className="">
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading && <Loader />}
            <Form onSubmit={(e) => submitHandler(e)}>
              <Form.Group id="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" ref={userFNameRef} required />
              </Form.Group>
              <Form.Group id="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" ref={userLNameRef} required />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={confirmPasswordRef}
                  required
                />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account?<Link to="/auth/signin">Sign In</Link>
        </div>
    </Fragment>
  );
};
export default Signup;

// import { useContext, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AuthContext from "../../contexts/auth-context";
// import classes from "./AuthForm.module.css";

// const AuthForm = () => {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const navigate = useNavigate();
//   const authCtx = useContext(AuthContext);
//   const [isLogin, setIsLogin] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);

//   const switchAuthModeHandler = () => {
//     setIsLogin((prevState) => !prevState);
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     const enteredEmail = emailRef.current.value;
//     const enteredPassword = passwordRef.current.value;
//     setIsLoading(true);
//     // check if the user is in login or sign-up mode
//     let url;
//     if (isLogin) {
//       url =
//         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAT5_26BrmAqrbbxu5TH3fUVj2o0T-fSE4";
//     } else {
//       url =
//         "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAT5_26BrmAqrbbxu5TH3fUVj2o0T-fSE4";
//     }
//     fetch(url, {
//       method: "POST",
//       body: JSON.stringify({
//         email: enteredEmail,
//         password: enteredPassword,
//         returnSecureToken: true,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         setIsLoading(false);
//         if (res.ok) {
//           return res.json();
//         } else {
//           return res.json().then((data) => {
//             let errorMessage = "Authentication Failed!";
//             //   if (data && data.error && data.error.message) {
//             //     errorMessage = data.error.message;
//             //   }
//             throw new Error(errorMessage);
//           });
//         }
//       })
//       .then((data) => {
//         const expirationTime = new Date(
//           new Date().getTime() + data.expiresIn * 1000
//         );
//         authCtx.login(data.idToken, expirationTime.toISOString());
//         navigate("/");
//         // console.log(data)
//       })
//       .catch((err) => {
//         alert(err.message);
//       });
//   };

//   return (
//     <section className={classes.auth}>
//       <h1>{isLogin ? "Login" : "Sign Up"}</h1>
//       <form onSubmit={submitHandler}>
//         <div className={classes.control}>
//           <label htmlFor="email">Your Email</label>
//           <input type="email" id="email" required ref={emailRef} />
//         </div>
//         <div className={classes.control}>
//           <label htmlFor="password">Your Password</label>
//           <input type="password" id="password" required ref={passwordRef} />
//         </div>
//         <div className={classes.actions}>
//           {!isLoading && (
//             <button>{isLogin ? "Login" : "Create Account"}</button>
//           )}
//           {isLoading && <p>Loading...</p>}
//           <button
//             type="button"
//             className={classes.toggle}
//             onClick={switchAuthModeHandler}
//           >
//             {isLogin ? "Create new account" : "Login with existing account"}
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default AuthForm;
