import React, { Fragment } from "react";
import { Form, Button, Card } from "react-bootstrap";

const Profile = () => {
  return (
    <Fragment>
      <div className="container">
        <h1 id="dasboard" className="mt-4">Dashboard</h1>
        <div className="container">
          <div className="row">
            <div className="col mt-2">One of two columns</div>
            <div className="col mt-2">
              <Card id="update-info">
                <Card.Body>
                  <h2 className="text-center mb-4">Update Information</h2>
                  <Form>
                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                      />
                    </Form.Group>
                    <Button className="w-50 mt-4" type="submit">
                      Update
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;