import React from "react";
import { useData } from "../../contexts/DataProvider";

export const ShopProduct = (props) => {
  const { addToCart } = useData();
  const product = props.product;

  return (
    <div className="card col-4">
      <img className="card-img-top" src={product.image} alt={product.name} />
      <div className="card-body">
        <h4 className="card-title">
          {product.name}
          <span className="float-right">{`$${(product.price / 100).toFixed(
            2
          )}`}</span>
        </h4>
        <p className="card-text">This shirt is for a New Yorker.</p>
      </div>
      <div className="card-footer">
        <button
          onClick={() => addToCart(product)}
          className="btn btn-block btn-success"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};