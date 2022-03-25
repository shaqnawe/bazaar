import React, { Fragment, useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import Loader from "../Loader/Loader";
import "./Auth.css";
import { Heading } from "@chakra-ui/react";

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
      <div className="d-flex justify-content-center">
        {loading ? (
          <Loader />
        ) : (
          <Card id="signin" className="bg-dark text-warning w-25">
            <Card.Body>
              <Heading>
                <h1 className="text-center mb-4">Sign In</h1>
              </Heading>
              {loading && <Loader />}
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={(e) => submitHandler(e)}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type="email"
                    ref={emailRef}
                    required
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="mt-2"
                    type="password"
                    ref={passwordRef}
                    required
                  />
                </Form.Group>
                <Button
                  disabled={loading}
                  className="btn-dark text-warning mt-2"
                  type="submit"
                >
                  Sign In
                </Button>
              </Form>
            </Card.Body>
            <div className="w-100 text-center mb-2">
              <Link to="/auth/forgot-password">
                <button className="btn btn-muted text-warning">
                  Forgot Password?
                </button>
              </Link>
            </div>
          </Card>
        )}
      </div>
      <Button
        onClick={() => signInWithGoogle()}
        className="btn-dark text-warning m-3"
      >
        Sign In with Google
      </Button>
      <div className="text-center mt-2">
        <button className="btn btn-muted">Don't have an account?</button>
        <Link to="/auth/signup">
          <button className="btn btn-muted" id="register">
            Register
          </button>
        </Link>
      </div>
    </Fragment>
  );
};
export default Signin;
