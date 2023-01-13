import { Link } from "react-router-dom";
import styles from "./dialogueBox.module.scss";
import img from "../../assets/default.jpg";

const DialogueBox = () => {
  return (
    <Link to="/dialogue/5" className={styles.box}>
      <img src={img} alt="error" />
      <div>
        <h2>Name</h2>
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
