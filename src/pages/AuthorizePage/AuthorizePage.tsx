import React, { useContext } from "react";
import styles from "./authorizationPage.module.scss";
import logo from "../../assets/logo.svg";
import { Context } from "../..";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAppDispatch } from "../../redux/store";
import { login } from "../../redux/slices/authSlice";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

function AuthorizePage() {
  const { auth, firestore } = useContext(Context);
  const dispatch = useAppDispatch();

  const loginHandler = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    const { displayName, email, photoURL, uid } = user;
    dispatch(login({ displayName, email, photoURL, uid }));
    const userInDB = query(
      collection(firestore, "users"),
      where("uid", "==", user.uid)
    );

    let needToAd = true;

    try {
      const querySnapshot = await getDocs(userInDB);
      querySnapshot.forEach(() => (needToAd = false));
    } catch (err) {
      console.log(err);
    }
    if (needToAd) {
      addDoc(collection(firestore, "users"), {
        displayName,
        email,
        photoURL,
        uid,
      });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.messageBox}>
        <h1>Log In to use this app</h1>
        <img src={logo} alt="error" />
        <button onClick={loginHandler} className="button">
          Login In
        </button>
      </div>
    </div>
  );
}

export default AuthorizePage;
