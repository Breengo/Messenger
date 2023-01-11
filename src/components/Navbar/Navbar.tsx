import React from "react";
import styles from "./navbar.module.scss";
import logo from "../../assets/logo.svg";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="error" />
        <h1>QuackChat</h1>
      </div>
    </nav>
  );
}

export default Navbar;
