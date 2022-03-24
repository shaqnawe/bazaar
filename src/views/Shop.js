import React, { Fragment } from 'react';
import Products from "../components/Products/Products";
import { useData } from '../contexts/DataProvider';

const Shop = () => {
    const { products } = useData();
    console.log(products);
    return (
      <Fragment>
        <h1 id="shop-header">Shop</h1>
        <hr/>
        <Products items={products} />
      </Fragment>
    );
};
export default Shop;