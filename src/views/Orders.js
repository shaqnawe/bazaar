import React, { Fragment } from "react";
import { useData } from "../contexts/DataProvider";
import OrderItem from "../components/Orders/OrderItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListSquares } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  const { orders } = useData();
//   const orderList = orders;
  console.log(orders);
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
          {orders.items.map((item) => (
            <OrderItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Orders;
