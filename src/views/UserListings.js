import React, { Fragment } from 'react';
import { useData } from '../contexts/DataProvider';
import UserItem from '../components/Shop/UserItem';
import { Heading } from '@chakra-ui/react';

const UserListings = () => {
    const { userItems } = useData();
    // console.log(userItems.items)
    const products = userItems.items
    return (
      <Fragment>
        <Heading mt={4}>
          <span className="container mt-4" id="listing-header">
            User Listings
          </span>
        </Heading>
        <div className="d-flex justify-content-center mt-4">
          {products.map((item) => (
            <UserItem key={item.id} data={item} />
          ))}
        </div>
      </Fragment>
    );
};

export default UserListings;