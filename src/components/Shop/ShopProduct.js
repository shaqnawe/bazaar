import React, { Fragment } from "react";
import { useData } from "../../contexts/DataProvider";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const ShopProduct = (props) => {
  const { addToCart } = useData();
  const product = props.data;

  // Function for adding to cart
  const addToCartHandler = (product) => {
    addToCart(product);
  };
  return (
    <Fragment>
      <Card
        className="flex-column m-2 bg-dark text-light"
        style={{ width: "18rem" }}
      >
        <Card.Img
          variant="top"
          alt="item image"
          src={product.image}
          style={{ height: "14rem", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="bg-dark text-light">{`$${
            product.price / 100
          }`}</ListGroupItem>
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
export default ShopProduct;
