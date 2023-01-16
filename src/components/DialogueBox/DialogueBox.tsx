import { Link } from "react-router-dom";
import styles from "./dialogueBox.module.scss";
import { IAtTime } from "../../pages/DialoguePage.tsx/DialoguePage";
import dateConverter from "../../utils/dateConverter";

interface IUserInfo {
  displayName: string;
  photoURL: string;
  uid: string;
  updatedAt: IAtTime;
  lastMessage: string;
}

const DialogueBox: React.FC<IUserInfo> = ({ ...dialogueInfo }) => {
  return (
    <Link to={`/dialogue/${dialogueInfo.uid}`} className={styles.box}>
      <img src={dialogueInfo.photoURL} alt="error" />
      <div>
        <h2>{dialogueInfo.displayName}</h2>
        <p>{dialogueInfo.lastMessage}</p>
      </div>
      <h5>{dateConverter(dialogueInfo.updatedAt.seconds)}</h5>
    </Link>
  );
};

export default DialogueBox;
