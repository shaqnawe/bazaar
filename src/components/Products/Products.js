import React, { Fragment } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const Gallery = (props) => {
  const products = props.items;
  return (
    <Fragment>
      <div className="container d-flex">
        {products.map((p) => (
          <Card
            className="flex-column m-2"
            key={p.id}
            style={{ width: "18rem" }}
          >
            <Card.Img variant="top" src={p.image} />
            <Card.Body>
              <Card.Title>{p.name}</Card.Title>
              <Card.Text>{p.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>{`$${p.price / 100}`}</ListGroupItem>
            </ListGroup>
            <button className="btn btn-success text-warning">Buy</button>
          </Card>
        ))}
      </div>
    </Fragment>
  );
};

export default Gallery;