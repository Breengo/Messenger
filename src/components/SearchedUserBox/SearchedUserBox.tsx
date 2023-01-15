import React from "react";
import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";
import styles from "./searchedUserBox.module.scss";

const SearchedUserBox: React.FC<DocumentData> = ({ ...srchBoxData }) => {
  return (
    <Link
      to={`/dialogue/${srchBoxData.uid}`}
      className={
        srchBoxData.last
          ? styles.search_box + " " + styles.last
          : styles.search_box
      }
    >
      <img src={srchBoxData.photoURL} alt="error" />
      <h1>{srchBoxData.displayName}</h1>
    </Link>
  );
};

export default SearchedUserBox;
