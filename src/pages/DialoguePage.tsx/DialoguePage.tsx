import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../..";
import MessageBox from "../../components/MessageBox/MessageBox";
import styles from "./dialoguePage.module.scss";
import img from "../../assets/default.jpg";
import arrowSVG from "../../assets/arrow.svg";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  DocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { useAppDispatch } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";
import MessageInput from "../../components/MessageInput/MessageInput";

const DialoguePage = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { auth, firestore } = useContext(Context);
  const currentUser = auth.currentUser;
  const receiver = useParams().id;
  const [userData, setUserData] = React.useState<DocumentData | undefined>();

  const createChat = async () => {
    const combinedId =
      [currentUser.uid, receiver].sort()[0] +
      [currentUser.uid, receiver].sort()[1];
    try {
      if (receiver) {
        const user = await getDoc(doc(firestore, "users", receiver));
        setUserData(user.data());
        const res = await getDoc(doc(firestore, "chats", combinedId));
        if (!res.exists()) {
          setDoc(doc(firestore, "chats", combinedId), { messages: [] });
          await updateDoc(doc(firestore, "userChats", user.id), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
          });
          await updateDoc(doc(firestore, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.id,
              displayName: user.data()?.displayName,
              photoURL: user.data()?.photoURL,
            },
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current?.scrollHeight;
    }
    const user = auth.currentUser;
    if (!user) {
      dispatch(logout());
    }
    createChat();
  }, []);

  if (!userData) {
    return <h1>Error</h1>;
  }

  return (
    <div className={styles.page}>
      <div ref={containerRef} className={styles.mainContainer}>
        <div className={styles.pageHeader}>
          <div onClick={() => navigate(-1)} className={styles.back_box}>
            <img src={arrowSVG} alt="errror" />
            <h3>Back</h3>
          </div>
          <div className={styles.interlocutor}>
            <img src={userData.photoURL} alt="error" />
            <h2>{userData.displayName}</h2>
          </div>
        </div>
        <div className={styles.message_list}>
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
        </div>
        <MessageInput />
      </div>
    </div>
  );
};
export default DialoguePage;
