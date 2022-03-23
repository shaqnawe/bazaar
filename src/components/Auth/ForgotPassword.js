import "./Auth.css";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import React, { Fragment, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

const ForgotPassword = () => {
  const emailRef = useRef();
  const navigate = useNavigate();
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
      <Card>
        <Card.Body>
          <h2 className="test-center mb-4">Password Reset</h2>
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
            <Button disabled={loading} className="w-30 mt-4" type="submit">
              Reset Password
            </Button>
          </Form>
          <Link to="/auth/signin">Login</Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account?<Link to="/auth/signup">Register</Link>
      </div>
    </Fragment>
  );
};
export default ForgotPassword;
