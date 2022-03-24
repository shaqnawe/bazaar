import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import DataProvider from "./contexts/DataProvider";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/auth-context";
import { firebaseApp } from "./firebase/config";
import { ChakraProvider } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Fragment>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  </Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
