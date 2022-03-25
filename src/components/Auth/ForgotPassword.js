import "./Auth.css";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import React, { Fragment, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Heading } from "@chakra-ui/react";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { forgotPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    try {
      setMessage("");
      setLoading(true);
      await forgotPassword(enteredEmail).then((response) => {
        console.log(response);
        setMessage("Check your inbox for next steps.");
      });
    } catch (error) {
      console.log(error);
      setError("User not found, please check your email and try again.");
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <Card className="bg-dark text-warning w-25">
            <Card.Body>
              <Heading>
                <h1 className="test-center mb-4">Reset Password</h1>
              </Heading>
              {loading && <Loader />}
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={(e) => submitHandler(e)}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="mt-2"
                    type="email"
                    ref={emailRef}
                    required
                  />
                </Form.Group>
                <Button
                  className="btn-dark text-warning mt-2"
                  disabled={loading}
                  type="submit"
                >
                  Reset Password
                </Button>
              </Form>
              <Link to="/auth/signin">
                <button className="btn btn-muted text-warning">Login</button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="w-100 text-center mt-2">
          <button id="no-account" className="btn btn-muted">
            Don't have an account?
          </button>
          <Link to="/auth/signup">
            <button id="register" className="btn btn-muted">
              Register
            </button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};
export default ForgotPassword;
