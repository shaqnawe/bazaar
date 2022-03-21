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
                <span className="text-muted">x</span>
              </strong>
            </h6>
          </div>
          <div className="col-4 col-sm-4 col-md-4">
            <div className="quantity">
              <input
                type="number"
                step="1"
                max="5"
                min="1"
                defaultValue={product.quantity}
                title="Qty"
                className="qty"
                size="4"
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
    </Fragment>
  );
};
export default OrderItem;