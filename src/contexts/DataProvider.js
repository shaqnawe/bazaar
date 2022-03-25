import axios from "axios";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 as uuid } from "uuid";
import { db } from "../firebase/config";
import { useAuth } from "./auth-context";

export const DataContext = createContext({
  //   token: "",
  //   isLoggedIn: false,
  //   login: (token) => {},
  //   logout: () => {},
});

export function useData() {
  return useContext(DataContext);
}

const DataProvider = (props) => {
  // const db = getFirestore();

  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({
    items: [],
    quantity: 0,
    subtotal: 0,
    tax: 0,
    grandtotal: 0,
  });
  const [orders, setOrders] = useState({
    items: [],
    quantity: 0,
    subtotal: 0,
    tax: 0,
    grandtotal: 0,
  });
  const [userItems, setUserItems] = useState({
    items: [],
    quantity: 0,
    subtotal: 0,
    tax: 0,
    grandtotal: 0,
  });

  const addProductInfo = async (data) => {
    const unique_id = uuid();
    console.log(unique_id);
    if (currentUser.loggedIn) {
      const productRef = doc(db, "products", unique_id);
      const productDoc = await getDoc(productRef);
      if (!productDoc.exists()) {
        await setDoc(productRef, {
          name: data.name,
          description: data.description,
          category: data.category,
          price: data.price,
          type: data.type,
          imgUrl: data.image,
        });
      }
    }
  };

  const getCart = async () => {
    // Check if there is a logged-in user
    if (currentUser.id) {
      let cartQuantity = 0;
      let subtotal = 0;
      let tax = 0;

      let userCartCollection = await collection(
        db,
        "users",
        currentUser.id,
        "cart"
      );
      // get access to user's cart info
      const querySnapshot = await getDocs(userCartCollection);
      // console.log(querySnapshot)
      let productList = [];
        setCart({
          items: [],
          quantity: 0,
          subtotal: "0.00",
          grandtotal: "0.00",
        });
      querySnapshot.forEach((doc) => {
        axios
          .get(
            `https://bazaar-products.herokuapp.com/api/v1/products/${doc.id}`
          )
          .then((res) => {
            // increment the cart's quantity by the product's quantity
            cartQuantity += doc.data().quantity;
            // add the data to products list, including quantity
            productList.push({ ...res.data, quantity: doc.data().quantity });
            // increment the subtotal by the products' price * quantity
            subtotal += res.data.price * doc.data().quantity;
            // console.log(cartQuantity)

            setCart({
              items: [...productList],
              quantity: cartQuantity,
              subtotal: subtotal.toFixed(2),
              grandtotal: subtotal.toFixed(2),
            });
          });
      });
    }
  };

  const addToCart = useCallback(
    async (productData) => {
      // if current user is logged in
      if (currentUser.loggedIn) {
        // access user's cart product from their collection
        const productRef = doc(
          db,
          "users",
          currentUser.id,
          "cart",
          productData.id
        );
        // find the product
        const productDoc = await getDoc(productRef);
        // if the product does not exist
        if (!productDoc.exists()) {
          // add the products's info to the Firebase database at the user's cart collection
          await setDoc(productRef, { quantity: 1 });
        } else {
          // increment the product's quantity by 1
          let quantity = productDoc.data().quantity;
          quantity++;
          // add update cart functionality
          await updateDoc(
            productRef,
            { quantity: Number(quantity) },
            { merge: true }
          );
        }
      }
      // retrieve new cart state from database
      getCart();
    },
    [db, currentUser.id]
  );

  const userListings = async () => {
    const productCollection = await collection(db, "products");
    const productSnapshot = await getDocs(productCollection);
    // console.log(productCollection);
    let productQuantity = 0;
    let subtotal = 0;
    let tax = 0;
    let id = null;

    let productList = [];

    productSnapshot.forEach((doc) => {
      // console.log(doc.data());
      id = doc.id;
      productQuantity += doc.data().quantity;
      productList.push({
        ...doc.data(),
        id: id,
        quantity: doc.data().quantity,
      });
      subtotal += doc.data().price * doc.data().quantity;

      setUserItems({
        items: [...productList],
        quantity: productQuantity,
        subtotal: subtotal.toFixed(2),
        tax: 2.5,
        grandtotal: (subtotal + tax).toFixed(2),
      });
    });
  };

  // Query Cart collection to get each doc from cart and add it to a list (possibly orders list)
  // const cartCollection = await collection(
  //   db,
  //   "users",
  //   currentUser.id,
  //   "cart"
  // );
  // const cartQuerySnapshot = await getDocs(cartCollection);
  // const orderList = [];
  //   cartQuerySnapshot.forEach((doc) => {
  //     orderList.push( { ...doc.data(), id: doc.id } )
  //   });
  // for(let item of orderList) {
  //   console.log(item)
  // const orderRef = collection(db,"users",currentUser.id,"orders",item.id)
  // for(let i=0;i<orderList.length;i++){
  //  if(!orderRef.exists()){
  //    setDoc(orderRef, orderList[i].id)
  // } else {
  // updateDoc(orderRef,
  //           { quantity: Number(orderList[i].quantity) },
  //           { merge: true }
  // )
  // }
  //
  // }
  //
  // }

  useEffect(() => {
    getCart();
    getOrders();
    userListings();
  }, [currentUser.id]);

  const updateCart = useCallback(
    async (productData, value) => {
      if (currentUser.loggedIn) {
        // access user's cart product from their collection
        const productRef = doc(
          db,
          "users",
          currentUser.id,
          "cart",
          productData.id
        );
        // find the product
        const productDoc = await getDoc(productRef);
        // if the product does not exist
        if (value === "remove" && !productDoc.exists()) {
          console.log("item no longer in cart");
        } else if (value === "remove" && productDoc.data().quantity > 1) {
          // decrease the product's quantity by 1
          let quantity = productDoc.data().quantity;
          quantity--;
          // add update cart functionality
          await updateDoc(
            productRef,
            { quantity: Number(quantity) },
            { merge: true }
          );
        } else if (value === "add" && productDoc.exists()) {
          // increase the product's quantity by 1
          let quantity = productDoc.data().quantity;
          quantity++;
          // add update cart functionality
          await updateDoc(
            productRef,
            { quantity: Number(quantity) },
            { merge: true }
          );
        }
      }
      getCart();
    },
    [db, currentUser.id]
  );

  const deleteCartItem = useCallback(
    async (productData) => {
      if (currentUser.loggedIn) {
        // access user's cart product from their collection
        const productRef = doc(
          db,
          "users",
          currentUser.id,
          "cart",
          productData.id
        );
        console.log(productRef);
        if (productRef) {
          getDoc(productRef)
            .then(() => {
              deleteDoc(productRef);
              console.log("Item removed from cart");
              getCart();
            })
            .catch((error) => console.log(error.message));
        }
      }
    },
    [db, currentUser.id]
  );

  const emptyCart = useCallback(async () => {
    if (currentUser.loggedIn) {
      const cartRef = await collection(db, "users", currentUser.id, "cart");
      const querySnapshot = await getDocs(cartRef);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        deleteDoc(doc.ref);
        console.log("deleted quantity");
      });
    }
  }, [db, currentUser.id]);

  const getOrders = async () => {
    // Check if there is a logged-in user
    if (currentUser.id) {
      let orderQuantity = 0;
      let subtotal = 0;
      let tax = 0;

      let userOrderCollection = await collection(
        db,
        "users",
        currentUser.id,
        "orders"
      );
      // get access to user's order info
      const querySnapshot = await getDocs(userOrderCollection);
      // console.log(querySnapshot)
      let ordersList = [];

      querySnapshot.forEach((doc) => {
        axios
          .get(
            `https://bazaar-products.herokuapp.com/api/v1/products/${doc.id}`
          )
          .then((res) => {
            // increment the cart's quantity by the product's quantity
            orderQuantity += doc.data().quantity;
            // add the data to products list, including quantity
            ordersList.push({ ...res.data, quantity: doc.data().quantity });
            // increment the subtotal by the products' price * quantity
            subtotal += res.data.price * doc.data().quantity;
            // console.log(orderQuantity)

            setOrders({
              items: [...ordersList],
              quantity: orderQuantity,
              subtotal: subtotal.toFixed(2),
              grandtotal: subtotal.toFixed(2),
            });
          });
      });
    }
  };

  const orderHistory = useCallback(
    async (productData) => {
      const orderRef = doc(
        db,
        "users",
        currentUser.id,
        "orders",
        productData.id
      );
      const orderDoc = await getDoc(orderRef);
      if (!orderDoc.exists()) {
        await setDoc(orderRef, { quantity: 1 });
      } else {
        // increment the product's quantity by 1
        let quantity = orderDoc.data().quantity;
        quantity++;
        // add update cart functionality
        await updateDoc(
          orderRef,
          { quantity: Number(quantity) },
          { merge: true }
        );
      }
      getOrders();
    },
    [db, currentUser.id]
  );

  const getproducts = async () => {
    await axios
      .get(`https://bazaar-products.herokuapp.com/api/v1/products`)
      .then((res) => {
        setProducts(res.data);
        // console.log(res.data);
      });
  };

  useEffect(() => {
    getproducts();
  }, []);

  const values = {
    getproducts,
    products: products,
    cart: cart,
    addToCart,
    orders,
    getOrders,
    orderHistory,
    emptyCart,
    getCart,
    updateCart,
    deleteCartItem,
    addProductInfo,
    userItems,
  };

  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
};

export default DataProvider;
