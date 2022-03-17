import React, { state, useContext, createContext, useEffect, useState } from "react";
import axios from "axios";
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

  const getproducts = async () => {
    await axios
      .get(`https://bazaar-products.herokuapp.com/api/v1/products`)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    getproducts()
  }, [])
  

  const values = {
    getproducts,
    products: products
  };

  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
};

export default DataProvider;
