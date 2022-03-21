import React, { Fragment } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const OrderItem = (props) => {
  const product = props.data;
  return (
    <Fragment>
      <Card className="flex-column m-2" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{`$${product.price / 100}`}</ListGroupItem>
        </ListGroup>
      </Card>
    </Fragment>
  );
};
export default OrderItem;