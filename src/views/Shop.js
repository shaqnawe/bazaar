import React, { Fragment } from 'react';
import Products from "../components/Products/Products";
import { useData } from '../contexts/DataProvider';

const Shop = () => {
    const { products } = useData();
    return (
      <Fragment>
        <Products items={products} />
      </Fragment>
    );
};
export default Shop;