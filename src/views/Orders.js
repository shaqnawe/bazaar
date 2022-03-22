import { faListSquares } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import OrderItem from "../components/Orders/OrderItem";
import { useData } from "../contexts/DataProvider";

const Orders = () => {
  const { orders } = useData();
  const message = "No previous orders... Nothing to see here 😵 ";

  return (
    <Fragment>
      <div className="card shopping-cart mt-4">
        <div id="card-header" className="card-header">
          <FontAwesomeIcon
            id="cart-icon"
            className="btn btn-lg"
            icon={faListSquares}
          ></FontAwesomeIcon>
          <span>Order History</span>
          <div className="clearfix"></div>
        </div>
        <div className="card-body">
          {orders.items.length < 1 ? (
            <h4>{message}</h4>
          ) : (
            orders.items.map((item) => <OrderItem key={item.id} data={item} />)
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Orders;
