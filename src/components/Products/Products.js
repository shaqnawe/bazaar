import React, { Fragment, useRef, useState, useEffect } from "react";
import ShopProduct from "../Shop/ShopProduct";

const Products = (props) => {
  const products = props.items;
  const inputRef = useRef();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredCategoryProducts, setFilteredCategoryProducts] = useState([]);

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
    // Add filtered products to map as search result
    setFilteredProducts(filteredProductList);
    inputRef.current.value = "";
  };

  const sortProductsByCategory = (e) => {
    const productCategoryList = [];
    const selectedCategory = e.target.value;
    console.log(selectedCategory);
    for (const product of products) {
      if (product.category === selectedCategory) {
        productCategoryList.push(product);
      }
    }
    setFilteredCategoryProducts(productCategoryList);
  };
  useEffect(() => {
  }, [filteredCategoryProducts]);

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
        <div>
          <form>
            <label className="d-flex inline-flex">
              <span className="mr-3">Shop by category</span>
              <span>
                <select
                  className="custom-select custom-select-sm"
                  name="category"
                  onChange={sortProductsByCategory}
                >
                  <option defaultValue>Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="sports">Sports</option>
                  <option value="board game">Board Games</option>
                  <option value="fashion">Fashion</option>
                </select>
              </span>
            </label>
          </form>
        </div>
      </div>
      <div className="container d-flex">
        {/* {filteredProducts.length < 1
          ? products.map((product) => (
              <ShopProduct key={product.id} data={product} />
            ))
          : filteredProducts.map((product) => (
              <ShopProduct key={product.id} data={product} />
            ))} */}
        {filteredCategoryProducts.length < 1
          ? products.map((product) => (
              <ShopProduct key={product.id} data={product} />
            ))
          : filteredCategoryProducts.map((product) => (
              <ShopProduct key={product.id} data={product} />
            ))}
      </div>
    </Fragment>
  );
};

export default Products;
