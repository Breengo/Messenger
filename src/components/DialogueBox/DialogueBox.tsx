import { Link } from "react-router-dom";
import styles from "./dialogueBox.module.scss";
import img from "../../assets/default.jpg";

interface IUserInfo {
  displayName: string;
  photoURL: string;
  uid: string;
}

const DialogueBox: React.FC<IUserInfo> = ({ ...dialogueInfo }) => {
  return (
    <Link to={`/dialogue/${dialogueInfo.uid}`} className={styles.box}>
      <img src={dialogueInfo.photoURL} alt="error" />
      <div>
        <h2>{dialogueInfo.displayName}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
          corporis maiores sunt ut, placeat consequatur.
        </p>
      </div>
      <h5>15 Jan</h5>
    </Link>
  );
};

export default DialogueBox;
