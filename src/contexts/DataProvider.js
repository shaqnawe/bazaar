import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useAuth } from "./auth-context";
import {
  doc,
  getDocs,
  getDoc,
  getFirestore,
  query,
  collectionGroup,
  collection,
  setDoc,
  setData,
  orderBy,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
export const DataContext = React.createContext({
  //   token: "",
  //   isLoggedIn: false,
  //   login: (token) => {},
  //   logout: () => {},
});

export function useData() {
  return useContext(DataContext);
}

const DataProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({
    items: [],
    quantity: 0,
    subtotal: 0,
    tax: 0,
    grandtotal: 0,
  });
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState({
    items: [],
    quantity: 0,
    subtotal: 0,
    tax: 0,
    grandtotal: 0,
  });
  const db = getFirestore();
  //   const [messages, setMessages] = useState([]);
  //   const [sent, setSent] = useState([]);
  //   const { currentUser } = useAuth();
  //   let userEmail;

  //   const db = getFirestore();

  //   const getMessages = useCallback(async () => {
  //     const q = query(collectionGroup(db, "messages"));

  //     let newMessages = [];

  //     const querySnapshot = await getDocs(q);

  //     querySnapshot.forEach(async (doc) => {
  //       const userRef = await getDoc(doc.ref.parent.parent);

  //       newMessages.push({
  //         id: doc.id,
  //         ...doc.data(),
  //         user: { ...userRef.data() },
  //       });
  //       setMessages(newMessages);
  //     });
  //     return querySnapshot;
  //   }, [db]);
  //   const getSent = useCallback(async () => {
  //     const q = query(collectionGroup(db, "sent"));

  //     let updatedSent = [];
  //     const querySnapshot = await getDocs(q);

  //     querySnapshot.forEach(async (doc) => {
  //       const userRef = await getDoc(doc.ref.parent.parent);
  //       userEmail = userRef.data().email;

  //       updatedSent.push({
  //         id: doc.id,
  //         ...doc.data(),
  //         user: userEmail,
  //       });
  //       setSent(updatedSent);
  //       console.log(updatedSent);
  //     });
  //     return querySnapshot;
  //   }, [db]);

  //   const sendEmail = async (emailData) => {
  //     let collectionRef = await collection(db, `users/${currentUser.id}/sent`);
  //     const docRef = await addDoc(collectionRef, emailData);
  //     const newDoc = await getDoc(docRef);
  //     const userRef = await getDoc(docRef.parent.parent);
  //     //   console.log(userRef)
  //     setSent([{ id: newDoc.id, ...newDoc.data() }]);
  //   };

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
      // const q = query(collectionGroup(db, currentUser.id, "cart"));
      // console.log(q)

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

  // useEffect(() => {
  //   const cartColRef = collection(db, "users", currentUser.id, "cart");
  //   const unsubscribe = onSnapshot(cartColRef, (snapshot) => {
  //     let cart = [];
  //     snapshot.docs.forEach((doc) => {
  //       cart.push({ ...doc.data, id: doc.id });
  //     });
  //     console.log(cart);
  //   });
  //   return unsubscribe;
  // }, []);

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
  // }

  useEffect(() => {
    getCart();
    getOrders();
  }, [currentUser.id]);

  const emptyCart = useCallback(async () => {
    if (currentUser.loggedIn) {
      const cartRef = await collection(db, "users", currentUser.id, "cart");
      const querySnapshot = await getDocs(cartRef);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        deleteDoc(doc.ref);
        console.log("deleted qunatity");
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
      // get access to user's cart info
      const querySnapshot = await getDocs(userOrderCollection);
      // console.log(querySnapshot)
      let ordersList = [];
      // const q = query(collectionGroup(db, currentUser.id, "cart"));
      // console.log(q)

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
      const orderCollection = await collection(
        db,
        "users",
        currentUser.id,
        "orders"
      );
      const orderQuerySnapshot = await getDocs(orderCollection);
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
  };

  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
};

export default DataProvider;
