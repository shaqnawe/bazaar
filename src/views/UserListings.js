import React, { Fragment } from 'react';
import { useData } from '../contexts/DataProvider';
import ShopProduct from '../components/Shop/ShopProduct';
import UserItem from '../components/Shop/UserItem';

const UserListings = () => {
    const { userItems } = useData();
    console.log(userItems.items)
    const products = userItems.items
    return (
      <Fragment>
        <h1 className="container mt-4" id="listing-header">User Listings</h1>
        <div className="d-flex justify-content-center mt-4">
          {products.map((item) => (
            <UserItem key={item.id} data={item} />
          ))}
        </div>
      </Fragment>
    );
};

export default UserListings;