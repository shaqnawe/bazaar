import React, { Fragment } from 'react';
import Products from "../components/Products/Products";
import { useData } from '../contexts/DataProvider';
import { Heading } from '@chakra-ui/react';

const Shop = () => {
    const { products } = useData();
    // console.log(products);
    return (
      <Fragment>
        <Heading mt={4}>
        <span id="shop-header">Shop</span>
        </Heading>
        <Products items={products} />
      </Fragment>
    );
};

export default Shop;