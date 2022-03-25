import React, { Fragment, useRef, useState } from "react";
import { Alert, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import Loader from "../components/Loader/Loader";
import { Heading } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSitemap } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, updateUserEmail, updateUserPassword } = useAuth();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPass = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    if (enteredPass !== enteredConfirmPassword) {
      return setError("Passwords do not match!");
    }
    const promises = [];
    setError("");
    setLoading(true);
    if (enteredEmail !== currentUser.email) {
      promises.push(updateUserEmail(enteredEmail));
    }
    if (enteredPass) {
      promises.push(updateUserPassword(enteredPass));
    }
    Promise.all(promises)
      .then(() => {
        <Alert variant="success">Information has been updated</Alert>;
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError("Unable to update account information");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <Heading mt={4}>
        <span id="dasboard">Dashboard</span>
      </Heading>
      <div className="container justify-content-center mt-4">
        <div id="avatar" className="d-flex justify-content-center mb-4">
          {currentUser.image ? (
            <img src={currentUser.image} />
          ) : (
            <FontAwesomeIcon id="user" icon={faUserCircle}></FontAwesomeIcon>
          )}
        </div>
        <div className="row">
          <div className="col mt-2">
            <div id="history-header" className="mb-3">
              <h1>Check Order History</h1>
            </div>
            <Link to="/profile/orders">
              <button>
                <FontAwesomeIcon
                  id="orders-btn"
                  icon={faSitemap}
                ></FontAwesomeIcon>
              </button>
            </Link>
          </div>
          <div className="col mt-2">
            <Card className="bg-dark text-warning" id="update-info">
              <Card.Body>
                <h2 id="dasboard-update" className="text-center mb-4">
                  Update Information
                </h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {loading && <Loader />}
                <Form onSubmit={(e) => submitHandler(e)}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      ref={emailRef}
                      defaultValue={currentUser.email}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordRef}
                      placeholder="Leave blank to keep the same"
                    />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      ref={confirmPasswordRef}
                      placeholder="Leave blank to keep the same"
                    />
                  </Form.Group>
                  <Button
                    className="btn-dark text-warning mt-4"
                    type="submit"
                  >
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
