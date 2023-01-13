import user from "../../assets/default.jpg";
import styles from "./searchedUserBox.module.scss";

interface ISrchUserBoxProps {
  last: boolean;
}

const SearchedUserBox: React.FC<ISrchUserBoxProps> = ({ last }) => {
  return (
    <div
      className={
        last ? styles.search_box + " " + styles.last : styles.search_box
      }
    >
      <img src={user} alt="error" />
      <h1>Name</h1>
    </div>
  );
};

export default SearchedUserBox;
