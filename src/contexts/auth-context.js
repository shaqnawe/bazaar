import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({ loggedIn: false });

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setCurrentUser({ loggedIn: true });
        console.log("Successful signup");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const signIn = (email, password) => {
    return setPersistence(auth, browserLocalPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
          // Signed in
          console.log("Signed in successfully!");
          navigate("/");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return errorCode, errorMessage;
      });
  };

  const signInWithGoogle = () => {
    return setPersistence(auth, browserLocalPersistence)
      .then(() => {
        signInWithPopup(auth, provider).then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          navigate("/");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.email;
        console.log(email);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  };

  const logOut = () => {
    return signOut(auth)
      .then(() => {
        setCurrentUser({ loggedIn: false });
        console.log("Logged out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserEmail = (email) => {
    return updateEmail(auth.currentUser, email)
  }

  const updateUserPassword = (password) => {
    return updatePassword(auth.currentUser, password)
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email, {
      url: "http://localhost:3000/login",
    });
  };

  const resetPassword = (oobcode, newPassword) => {
    return confirmPasswordReset(auth, oobcode, newPassword);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        setDoc(
          userRef,
          {
            email: user.email,
            name: user?.displayName,
          },
          { merge: true }
        );
        setCurrentUser({
          id: user.uid,
          email: user.email,
          loggedIn: true,
        });
        setLoading(false);
      }
      // console.log(currentUser)
    });
  }, [auth, db]);

  const values = {
    currentUser,
    signUp,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserEmail,
    updateUserPassword,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
