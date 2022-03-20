import React, { Fragment, useRef, useState } from "react";
import { useData } from "../../contexts/DataProvider";
import ShopProduct from "../Shop/ShopProduct";

const Products = (props) => {
  const products = props.items;
  const inputRef = useRef();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useData();
  // Functionality to be able to search for product using keywords
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
          ? products.map((product) => (
              <ShopProduct key={product.key} data={product} />
            ))
          : filteredProducts.map((product) => (
              <ShopProduct key={product.key} data={product} />
            ))}
      </div>
    </Fragment>
  );
};

export default Products;