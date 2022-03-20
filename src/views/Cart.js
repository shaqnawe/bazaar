import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useData } from "../contexts/DataProvider";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const Cart = () => {
  const { cart } = useData();

  return (
    <Fragment>
      <h1 id="cart-header" className="col mt-4">
        Shopping Cart
        <span className="float-right">
          <Link to="/shop/checkout">
            <form>
              <input
                id="checkout-button"
                type="submit"
                className="btn btn-primary"
                value="Checkout"
              />
            </form>
          </Link>
        </span>
      </h1>
      <hr />

      <div className="card shopping-cart">
        <div className="card-header bg-dark text-light">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i> Shopping
          Cart
          <Link
            to="/shop"
            className="btn btn-outline-info btn-sm pull-right float-right"
          >
            Continue Shopping
          </Link>
          <div className="clearfix"></div>
        </div>
        <div className="card-body">
          {cart.items.map((item) => (
            // <Cart key={item.id} data={item} />
            <Card
              className="flex-column m-2"
              key={item.id}
              style={{ width: "18rem" }}
            >
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>{`$${item.price / 100}`}</ListGroupItem>
              </ListGroup>
            </Card>
          ))}
        </div>
        <div className="card-footer">
          <div className="text-right">
            <div className="cart-totals">
              Subtotal: <b> {`$${(cart.subtotal / 100).toFixed(2)}`} </b>
            </div>
            <div className="cart-totals">
              Tax: <b>{`$${0}`}</b>
              {/* Tax: <b>{`$${ cart.tax }`}</b> */}
            </div>
            <div className="cart-totals">
              Grand total: <b>{`$${(cart.grandtotal / 100).toFixed(2)}`}</b>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Cart;
