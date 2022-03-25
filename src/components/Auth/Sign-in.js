import React, { Fragment, useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import Loader from "../Loader/Loader";
import "./Auth.css";

const Signin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn, signInWithGoogle } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPass = passwordRef.current.value;
    try {
      setMessage("");
      setLoading(true);
      await signIn(enteredEmail, enteredPass).then((response) => {
        console.log(response);
        setMessage("Logging In");
      });
    } catch (error) {
      console.log(error);
      setError("Please check your username or password and try again.");
    }
    setLoading(false);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Card>
          <Card.Body>
            <h2 className="test-center mb-4">Sign In</h2>
            {loading && <Loader />}
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={(e) => submitHandler(e)}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Sign In
              </Button>
            </Form>
          </Card.Body>
          <div className="w-100 text-center mb-3">
            <Link to="/auth/forgot-password">Forgot Password?</Link>
          </div>
        </Card>
      )}
      <button
        onClick={() => signInWithGoogle()}
        className="btn btn-outline-primary m-3"
      >
        Sign In with Google
      </button>
      <div className="w-100 text-center mt-2">
        Don't have an account?<Link to="/auth/signup">Register</Link>
      </div>
    </Fragment>
  );
};
export default Signin;
