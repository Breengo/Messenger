import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import MessageBox from "../../components/MessageBox/MessageBox";
import styles from "./dialoguePage.module.scss";
import img from "../../assets/default.jpg";
import arrowSVG from "../../assets/arrow.svg";

import { useAppDispatch } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";
import MessageInput from "../../components/MessageInput/MessageInput";

const DialoguePage = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { auth } = useContext(Context);
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current?.scrollHeight;
    }
    const user = auth.currentUser;
    if (!user) {
      dispatch(logout());
    }
  }, []);

  return (
    <div className={styles.page}>
      <div ref={containerRef} className={styles.mainContainer}>
        <div className={styles.pageHeader}>
          <div onClick={() => navigate(-1)} className={styles.back_box}>
            <img src={arrowSVG} alt="errror" />
            <h3>Back</h3>
          </div>
          <div className={styles.interlocutor}>
            <img src={img} alt="error" />
            <h2>Name</h2>
          </div>
        </div>
        <div className={styles.message_list}>
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
          <MessageBox />
        </div>
        <MessageInput />
      </div>
    </div>
  );
};
export default DialoguePage;
