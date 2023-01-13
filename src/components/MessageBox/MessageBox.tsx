import styles from "./messageBox.module.scss";
import img from "../../assets/default.jpg";

const MessageBox = () => {
  return (
    <div className={styles.messageBox}>
      <img src={img} alt="error" />
      <div>
        <h2>Name</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat vero
          enim non, consectetur deserunt fugit.
        </p>
      </div>
    </div>
  );
};

export default MessageBox;
