import styles from "./Heading.module.scss";

export const Heading = ({ children }: { children: string }) => {
  return <h1 className={styles.head}>{children}</h1>;
};
