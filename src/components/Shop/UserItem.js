import React, { Fragment } from "react";
import { useData } from "../../contexts/DataProvider";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const UserItem = (props) => {
  const { addToCart, copyCart } = useData();
  const product = props.data;

  // Function for adding to cart
  const addToCartHandler = (product) => {
    copyCart(product);
    addToCart(product);
  };
  return (
    <Fragment>
      <Card className="flex-column m-2 bg-dark text-light" style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={product.imgUrl}
          style={{ height: "15rem" }}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="bg-dark text-light">{`$${product.price}`}</ListGroupItem>
        </ListGroup>
        <button
          className="btn btn-success text-warning"
          onClick={() => addToCartHandler(product)}
        >
          Add To Cart
        </button>
      </Card>
    </Fragment>
  );
};
export default UserItem;