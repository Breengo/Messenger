import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./navbar.module.scss";

import logoSVG from "../../assets/logo.svg";
import searchSVG from "../../assets/search.svg";
import user from "../../assets/default.jpg";

function Navbar() {
  const searchBoxRef = React.useRef<HTMLDivElement>(null);
  const onSearchFocusHandler = () => {
    if (searchBoxRef.current) searchBoxRef.current.style.width = "50%";
  };
  const onSearchBlurHandler = () => {
    if (searchBoxRef.current) searchBoxRef.current.style.width = "30%";
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
        </div>
        <div className={styles.user_profile}>
          <img src={user} alt="error" />
          <h2>Username</h2>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
