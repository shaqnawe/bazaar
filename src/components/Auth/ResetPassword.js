import Loader from "../Loader/Loader";
import { Form, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/auth-context";
import React, { Fragment, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string for you.
const useQuery = () => {
  const loacation = useLocation();
  return new URLSearchParams(loacation.search);
};

const ResetPassword = () => {
  const query = useQuery();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredPass = passwordRef.current.value;
    try {
        setLoading(true);
      await resetPassword(query.get("oobCode"), enteredPass).then(
        (response) => {
          setMessage("Password has been updated.");
          console.log(response);
          navigate("/auth/signin");
        }
      );
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
    setLoading(false)
  };

  return (
    <Fragment>
      <Card>
        <Card.Body>
          <h2 className="text-center">Reset password</h2>
          {loading && <Loader />}
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form
            onSubmit={async (e) => {
              submitHandler(e);
            }}
          >
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <button className="btn btn-outline-primary mt-4" type="submit">
              Reset password
            </button>
          </Form>
        </Card.Body>
      </Card>
    </Fragment>
  );
};
export default ResetPassword;
