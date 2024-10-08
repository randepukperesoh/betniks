import { useState } from "react";
import { CopyIcon } from "../../assets/CopyIcon";

import styles from "./Copied.module.scss";

export const Copied = ({ text }: { text: string }) => {
  const [innerText, setInnerText] = useState(text);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(innerText)
      .then(() => {})
      .catch((err) => {
        console.error("Ошибка при копировании текста: ", err);
      });
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={innerText}
        onChange={(e) => setInnerText(e.target.value)}
        className={styles.input}
      />
      <span onClick={handleCopy} className={styles.icon}>
        <CopyIcon />
      </span>
    </div>
  );
};
