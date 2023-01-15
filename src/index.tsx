import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Provider } from "react-redux/es/exports";
import store from "./redux/store";

const app = initializeApp({
  apiKey: "AIzaSyBHkUaPGPDpaN4vZbgEmh2oOZJYnnyKegQ",
  authDomain: "messenger-254ae.firebaseapp.com",
  projectId: "messenger-254ae",
  storageBucket: "messenger-254ae.appspot.com",
  messagingSenderId: "750202194766",
  appId: "1:750202194766:web:444238cc56d4fc65ff6c1f",
  measurementId: "G-L80M333J6H",
});

export const Context = createContext<any | null>(null);

const auth = getAuth(app);
const firestore = getFirestore(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Context.Provider value={{ auth, firestore }}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Context.Provider>
);
