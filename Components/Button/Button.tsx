import { ReactNode } from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
  label: ReactNode;
  classname?: string;
  onClick?: () => void;
}

export const Button = ({ label, classname, onClick }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${classname}`} onClick={onClick}>
      {label}
    </button>
  );
};
