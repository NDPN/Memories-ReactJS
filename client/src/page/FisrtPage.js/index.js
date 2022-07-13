import React, { useRef } from "react";
import styles from "./FirstPage.module.scss";

function FirstPage() {
  return (
    <div className={styles.welImg}>
      <img src={"http://localhost:5000/uploads/34663.gif"} alt="..." />
      <div className={styles.title}>Welcome to Memories-Realtime</div>
    </div>
  );
}

export default FirstPage;
