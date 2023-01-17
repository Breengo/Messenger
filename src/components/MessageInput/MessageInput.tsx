import styles from "./messageInput.module.scss";
import React, { useContext } from "react";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { Context } from "../..";

import sendSVG from "../../assets/send.svg";

interface IMessageBox {
  combinedId: string;
  uid: string;
  receiverId: string | undefined;
}

const MessageInput: React.FC<IMessageBox> = ({
  receiverId,
  uid,
  combinedId,
}) => {
  const messageInputRef = React.useRef<HTMLTextAreaElement>(null);
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
      const message = messageInputRef.current.value;
      messageInputRef.current.value = "";
      resizeInputHandler();
      try {
        await updateDoc(doc(firestore, "chats", combinedId), {
          messages: arrayUnion({
            id: uuidv4(),
            uid: uid,
            createdAt: Timestamp.now(),
            text: message,
          }),
        });
        await updateDoc(doc(firestore, "userChats", uid), {
          [combinedId + ".updatedAt"]: Timestamp.now(),
          [combinedId + ".lastMessage"]: message,
        });
        if (receiverId) {
          await updateDoc(doc(firestore, "userChats", receiverId), {
            [combinedId + ".updatedAt"]: Timestamp.now(),
            [combinedId + ".lastMessage"]: message,
          });
        }
      } catch (e) {
        console.error(e);
      }
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
};

export default MessageInput;
