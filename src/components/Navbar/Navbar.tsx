import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./navbar.module.scss";

import logoSVG from "../../assets/logo.svg";
import searchSVG from "../../assets/search.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Context } from "../..";
import SearchedUserBox from "../SearchedUserBox/SearchedUserBox";
import debounce from "../../utils/debounce";

function Navbar() {
  const searchBoxRef = React.useRef<HTMLDivElement>(null);
  const userData = useSelector((state: RootState) => state.auth.userData);
  const { firestore } = useContext(Context);
  const [foundUsers, setFoundUsers] = React.useState<DocumentData[]>([]);
  const fetchUsers = async (name: string) => {
    const userInDB = query(
      collection(firestore, "users"),
      where("displayName", "==", name)
    );
    try {
      setFoundUsers([]);
      const querySnapshot = await getDocs(userInDB);
      querySnapshot.forEach((doc) => {
        setFoundUsers([...foundUsers, { ...doc.data(), uid: doc.id }]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onSearchFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (searchBoxRef.current)
      searchBoxRef.current.style.border = "2px solid rgb(46, 43, 43)";
    debounce(() => fetchUsers(e.target.value), 300);
  };
  const onSearchBlurHandler = () => {
    if (searchBoxRef.current)
      searchBoxRef.current.style.border = "2px solid transparent";
    setTimeout(() => setFoundUsers([]), 100);
  };

  const handleSearcUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => fetchUsers(e.target.value), 300);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          <img src={logoSVG} alt="error" />
          <h1>QuackChat</h1>
        </Link>
        <div ref={searchBoxRef} className={styles.search_bar}>
          <img src={searchSVG} alt="error" />
          <input
            onFocus={onSearchFocusHandler}
            onBlur={onSearchBlurHandler}
            onChange={(e) => handleSearcUsers(e)}
            placeholder="Search for someone"
            type="text"
          />
          <div className={styles.search_result}>
            {foundUsers.map((userData, index) => {
              if (index === foundUsers.length - 1)
                return (
                  <SearchedUserBox
                    key={userData.uid}
                    {...{ ...userData, last: true }}
                  />
                );
              else {
                return (
                  <SearchedUserBox
                    key={userData.uid}
                    {...{ ...userData, last: false }}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className={styles.user_profile}>
          <img
            referrerPolicy="no-referrer"
            src={userData?.photoURL}
            alt="error"
          />
          <h2>{userData?.displayName}</h2>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
