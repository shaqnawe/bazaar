import React, { Fragment, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/auth-context";
import { Link } from "react-router-dom";
import './Auth.css';

const Signin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, signIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPass = passwordRef.current.value;
    try {
      setLoading(true)
      signIn(enteredEmail, enteredPass)
    } catch {
      setError("Failed to Login. Please check your email or password.");
    }
    setLoading(false)
  };

  return (
    <Fragment>
        <Card>
          <Card.Body>
            <h2 className="test-center mb-4">Sign In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
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
        </Card>
        <div className="w-100 text-center mt-2">
          Don't have an account?<Link to="/auth/signup">Register</Link>
        </div>
    </Fragment>
  );
};
export default Signin;
