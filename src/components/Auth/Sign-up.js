import React, { Fragment, useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import Loader from "../Loader/Loader";
import { Heading } from "@chakra-ui/react";
import "./Auth.css";

const Signup = () => {
  const emailRef = useRef();
  const { signUp } = useAuth();
  const passwordRef = useRef();
  const userFNameRef = useRef();
  const userLNameRef = useRef();
  const confirmPasswordRef = useRef();
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
    if (enteredPass !== enteredConfirmPassword) {
      return setError("Passwords do not match!");
    }
    try {
      setLoading(true);
      signUp(enteredEmail, enteredPass);
    } catch {
      setError("There was a problem creating the account");
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-center mt-5">
        <Card id="signup" className="bg-dark text-warning w-25">
          <Card.Body>
            <Heading>
              <h1 className="text-center mb-4">Sign Up</h1>
            </Heading>
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
              <Button
                disabled={loading}
                className="btn-dark text-warning mt-2"
                type="submit"
              >
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <div className="text-center mt-2">
        <button id="have-account" className="btn btn-muted">
          Already have an account?
        </button>
        <Link to="/auth/signin">
          <button className="btn btn-muted" id="login">
            Sign In
          </button>
        </Link>
      </div>
    </Fragment>
  );
};
export default Signup;
