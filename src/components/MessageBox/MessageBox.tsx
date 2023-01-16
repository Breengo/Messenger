import styles from "./messageBox.module.scss";
import { IMessage } from "../../pages/DialoguePage.tsx/DialoguePage";
import { useContext } from "react";
import { Context } from "../..";
import dateConverter from "../../utils/dateConverter";

interface IMessageBox extends IMessage {
  receiverName: string;
  receiverPhoto: string;
}

const MessageBox: React.FC<IMessageBox> = ({
  uid,
  text,
  createdAt,
  id,
  receiverName,
  receiverPhoto,
}) => {
  const { auth } = useContext(Context);
  return (
    <div className={styles.messageBox}>
      <img
        src={
          uid === auth.currentUser.uid
            ? auth.currentUser.photoURL
            : receiverPhoto
        }
        alt="error"
      />
      <div>
        <h2>{uid === auth.currentUser.uid ? "You" : receiverName}</h2>
        <p>{text}</p>
        <h5>{dateConverter(createdAt.seconds)}</h5>
      </div>
    </div>
  );
};

export default MessageBox;
