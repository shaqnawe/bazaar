import React, { Fragment } from 'react';
import { useData } from '../contexts/DataProvider';
import OrderItem from '../components/Orders/OrderItem';

const Orders = () => {
    const { orders } = useData();
    const orderList = orders;
    console.log(orders);
    return (
      <Fragment>
        <h1>Order History</h1>
        {orderList.items.map((product) => {
          <OrderItem key={product.id} data={product} />;
        })}
      </Fragment>
    );
}

export default Orders;