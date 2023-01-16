import React, { useContext } from "react";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { Context } from "../..";
import DialogueBox from "../../components/DialogueBox/DialogueBox";
import styles from "./mainPage.module.scss";
import DialogueSkeleton from "../../components/DialogueBox/DialogueSkeleton";
import logoSVG from "../../assets/logo.svg";

function MainPage() {
  const [dialogueList, setDialogueList] = React.useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { auth, firestore } = useContext(Context);
  const fetchDialogues = async () => {
    const chats = await getDoc(
      doc(firestore, "userChats", auth.currentUser.uid)
    );
    const chatsList = chats.data();
    setDialogueList([]);
    for (const key in chatsList) {
      setDialogueList((prev) => {
        return [...prev, { ...chatsList[key] }];
      });
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    fetchDialogues();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.mainContainer}>
        {isLoading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
            <DialogueSkeleton key={item} />
          ))}
        {!dialogueList[0] && !isLoading && (
          <div className={styles.no_dialogues}>
            <img src={logoSVG} alt="error" />
            <h1>
              No dialogues. Start dialogue with somebody and it will be shown
              here.
            </h1>
          </div>
        )}
        {!isLoading &&
          dialogueList[0] &&
          dialogueList.map((dialogueInfo) => (
            <DialogueBox
              key={dialogueInfo.userInfo.uid}
              updatedAt={dialogueInfo.updatedAt}
              lastMessage={dialogueInfo.lastMessage}
              displayName={dialogueInfo.userInfo.displayName}
              uid={dialogueInfo.userInfo.uid}
              photoURL={dialogueInfo.userInfo.photoURL}
            />
          ))}
      </div>
    </div>
  );
}

export default MainPage;
