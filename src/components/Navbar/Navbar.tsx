import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./navbar.module.scss";

import logoSVG from "../../assets/logo.svg";
import searchSVG from "../../assets/search.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SearchedUserBox from "../SearchedUserBox/SearchedUserBox";

function Navbar() {
  const searchBoxRef = React.useRef<HTMLDivElement>(null);
  const userData = useSelector((state: RootState) => state.auth.userData);
  const [showResult, setShowResult] = React.useState(false);
  const onSearchFocusHandler = () => {
    if (searchBoxRef.current)
      searchBoxRef.current.style.border = "2px solid rgb(46, 43, 43)";
    setShowResult(true);
  };
  const onSearchBlurHandler = () => {
    if (searchBoxRef.current)
      searchBoxRef.current.style.border = "2px solid transparent";
    setShowResult(false);
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
            placeholder="Search for someone"
            type="text"
          />
          {showResult && (
            <div className={styles.search_result}>
              <SearchedUserBox last={false} />
              <SearchedUserBox last={false} />
              <SearchedUserBox last={false} />
              <SearchedUserBox last={false} />
              <SearchedUserBox last={false} />
              <SearchedUserBox last={true} />
            </div>
          )}
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
