import styles from "./messageInput.module.scss";
import React, { useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Context } from "../..";
import { useParams } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
import sendSVG from "../../assets/send.svg";

export default function MessageInput() {
  const messageInputRef = React.useRef<HTMLTextAreaElement>(null);
  const userData = useSelector((state: RootState) => state.auth.userData);
  const ruid = useParams().id;
  const { firestore } = useContext(Context);
  function resizeInputHandler() {
    if (messageInputRef.current) {
      messageInputRef.current.style.height = "auto";
      messageInputRef.current.style.height = `${
        messageInputRef.current.scrollHeight + 4
      }px`;
    }
  }
  async function sendMessageHandler() {
    if (messageInputRef.current) {
      try {
        const docRef = await addDoc(collection(firestore, "messages"), {
          ruid,
          uid: userData?.uid,
          createdAt: serverTimestamp(),
          text: messageInputRef.current.value,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      messageInputRef.current.value = "";
    }
  }

  return (
    <div className={styles.messageInput}>
      <textarea
        ref={messageInputRef}
        onChange={resizeInputHandler}
        placeholder="Enter your message"
      ></textarea>
      <img onClick={sendMessageHandler} src={sendSVG} alt="error" />
    </div>
  );
}
