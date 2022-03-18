import React, { Fragment, useRef, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useData } from "../../contexts/DataProvider";

const Products = (props) => {
  const products = props.items;
  const inputRef = useRef();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useData();
  const findProduct = (e) => {
    e.preventDefault();
    const filteredProductList = [];
    // Loop through the products list
    for (const product of products) {
      if (
        product.category.includes(inputRef.current.value) ||
        product.type.includes(inputRef.current.value)
      ) {
        // console.log(product.body)
        filteredProductList.push(product);
      }
    }
    setFilteredProducts(filteredProductList);
    inputRef.current.value = "";
  };
  const addToCartHandler = (product) => {
    addToCart(product)
  };
  return (
    <Fragment>
      <div className="container mt-4">
        <form onSubmit={findProduct} className="input-group mb-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            ref={inputRef}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-block" id="search-btn">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="container d-flex">
        {filteredProducts.length < 1
          ? products.map((p) => (
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
                <button
                  className="btn btn-success text-warning"
                  onClick={()=>addToCartHandler(p)}
                >
                  Add To Cart
                </button>
              </Card>
            ))
          : filteredProducts.map((p) => (
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
                <button 
                className="btn btn-success text-warning"
                onClick={()=>addToCartHandler(p)}>
                  Add To Cart
                </button>
              </Card>
            ))}
      </div>
    </Fragment>
  );
};

export default Products;