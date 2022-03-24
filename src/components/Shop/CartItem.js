import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useState } from "react";
import { useData } from "../../contexts/DataProvider";

const CartItem = (props) => {
  const item = props.data;
  const { cart, updateCart, emptyCart, getCart, deleteCartItem } = useData();
  const [add, setAdd] = useState("add");
  const [remove, setRemove] = useState("remove");
  const addProduct = async (e) => {
    e.preventDefault();
    // console.log(add)
    await updateCart(item, add).then(console.log("item added."));
  };
  const removeProduct = async (e) => {
    e.preventDefault();
    // console.log(remove)
    await updateCart(item, remove).then(console.log("item removed."));
  };

  const deleteItem = async (e) => {
    e.preventDefault();
    await deleteCartItem(item).then(console.log("Item deleted from cart."));
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-2 text-center">
          <img
            className="img-responsive"
            src={item.image}
            alt={item.name}
            height="80"
          />
        </div>
        <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
          <h4 className="product-name">
            <strong>{item.name}</strong>
          </h4>
          <h4>
            <small>{item.description}</small>
          </h4>
        </div>
        <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
          <div
            className="col-3 col-sm-3 col-md-6 text-md-right"
            style={{ paddingTop: "5px" }}
          >
            <h6>
              <strong>
                ${(item.price / 100).toFixed(2)}{" "}
                <span className="text-muted ml-2">x</span>
              </strong>
            </h6>
          </div>
          <div className="col-4 col-sm-4 col-md-4">
            <div className="quantity">
              <span>
                <strong>{item.quantity}</strong>
              </span>
              <span onClick={(e) => addProduct(e)}>
                <FontAwesomeIcon
                  id="add-product"
                  className="btn btn-sm"
                  icon={faPlus}
                  onClick={() => setAdd("add")}
                ></FontAwesomeIcon>
                <i class="material-icons">add_shopping_cart</i>
              </span>
              <span onClick={(e) => removeProduct(e)}>
                <FontAwesomeIcon
                  id="remove-product"
                  className="btn btn-sm"
                  icon={faMinus}
                  onClick={() => setRemove("remove")}
                ></FontAwesomeIcon>
              </span>
            </div>
          </div>
          <div className="col-2 col-sm-2 col-md-2 text-right">
            <FontAwesomeIcon
              id="trash"
              className="btn btn-sm"
              icon={faTrash}
              onClick={(e) => deleteItem(e)}
            ></FontAwesomeIcon>
          </div>
        </div>
      </div>
      <hr />
    </Fragment>
  );
};
export default CartItem;
