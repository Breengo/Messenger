import styles from "./dialogueBox.module.scss";
import img from "../../assets/default.jpg";

const DialogueBox = () => {
  return (
    <div className={styles.box}>
      <img src={img} alt="error" />
      <h2>Name</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
        corporis maiores sunt ut, placeat consequatur.
      </p>
    </div>
  );
};

export default DialogueBox;
