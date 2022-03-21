import React, { Fragment } from "react";

const OrderItem = (props) => {
  const product = props.data;
  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-2 text-center">
          <img
            className="img-responsive"
            src={product.image}
            alt={product.name}
            height="80"
          />
        </div>
        <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
          <h4 className="product-name">
            <strong>{product.name}</strong>
          </h4>
          <h4>
            <small>{product.description}</small>
          </h4>
        </div>
        <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
          <div
            className="col-3 col-sm-3 col-md-6 text-md-right"
            style={{ paddingTop: "5px" }}
          >
            <h6>
              <strong>
                ${(product.price / 100).toFixed(2)}{" "}
              </strong>
                <span className="text-dark ml-3">x</span>
            </h6>
          </div>
          <div className="col-4 col-sm-4 col-md-4">
            <div className="quantity">
              <span>{product.quantity}</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </Fragment>
  );
};
export default OrderItem;