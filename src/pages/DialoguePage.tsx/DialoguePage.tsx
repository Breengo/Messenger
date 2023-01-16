import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../..";
import MessageBox from "../../components/MessageBox/MessageBox";
import styles from "./dialoguePage.module.scss";
import arrowSVG from "../../assets/arrow.svg";
import logoSVG from "../../assets/logo.svg";
import {
  getDoc,
  doc,
  setDoc,
  updateDoc,
  DocumentData,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { useAppDispatch } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";
import MessageInput from "../../components/MessageInput/MessageInput";
import DialogueSkeleton from "../../components/DialogueBox/DialogueSkeleton";

export interface IAtTime {
  seconds: number;
  nanoseconds: number;
}

export interface IMessage {
  createdAt: IAtTime;
  id: string;
  text: string;
  uid: string;
}

const DialoguePage = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { auth, firestore } = useContext(Context);
  const [isLoading, setIsLoading] = React.useState(true);
  const currentUser = auth.currentUser;
  const receiver = useParams().id;
  const [messageList, setMessageList] = React.useState<IMessage[]>([]);
  const combinedId =
    [currentUser.uid, receiver].sort()[0] +
    [currentUser.uid, receiver].sort()[1];
  const [userData, setUserData] = React.useState<DocumentData | undefined>();

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current?.scrollHeight;
    }
    const user = auth.currentUser;
    if (!user) {
      dispatch(logout());
    }
    createChat();
    const unsub = onSnapshot(doc(firestore, "chats", combinedId), (doc) => {
      const data = doc.data()?.messages;
      setMessageList(data);
      setIsLoading(false);
      return () => unsub();
    });
  }, []);

  const createChat = async () => {
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
            [combinedId + ".lastMessage"]: "",
            [combinedId + ".updatedAt"]: Timestamp.now(),
          });
          await updateDoc(doc(firestore, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.id,
              displayName: user.data()?.displayName,
              photoURL: user.data()?.photoURL,
            },
            [combinedId + ".lastMessage"]: "",
            [combinedId + ".updatedAt"]: Timestamp.now(),
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        {isLoading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
            <DialogueSkeleton key={item} />
          ))}
        {!isLoading && (
          <div className={styles.message_list}>
            {messageList &&
              messageList[0] &&
              messageList.reverse().map((message) => (
                <MessageBox
                  key={message.id}
                  {...{
                    id: message.id,
                    createdAt: message.createdAt,
                    text: message.text,
                    uid: message.uid,
                    receiverName: userData.displayName,
                    receiverPhoto: userData.photoURL,
                  }}
                />
              ))}
            {messageList && !messageList[0] && (
              <div className={styles.no_messages}>
                <img src={logoSVG} alt="error" />
                <h1>No messages</h1>
              </div>
            )}
          </div>
        )}

        <MessageInput
          combinedId={combinedId}
          uid={currentUser.uid}
          receiverId={receiver}
        />
      </div>
    </div>
  );
};
export default DialoguePage;
