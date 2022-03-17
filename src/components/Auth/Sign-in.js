import React, { Fragment, useRef, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useAuth } from "../../contexts/auth-context";
import { Link } from "react-router-dom";

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
    // Check if the passwords are the same
    signIn(enteredEmail, enteredPass);
  };

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <h2 className="test-center mb-4">Sign In</h2>
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button className="w-100 mt-4" type="submit">
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
