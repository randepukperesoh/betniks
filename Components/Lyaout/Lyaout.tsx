import { usePathname } from "next/navigation";
import { Header } from "../Header/Header";
import { ReactNode } from "react";

import styles from "./Lyaout.module.scss";

export const Layout = ({ children }: { children: ReactNode }) => {
  const path = usePathname();

  return (
    <>
      {path !== "/" && <Header />}
      <main className={styles.wrapper}>
        <div className={styles.wrapper_gradients}>
          <div className={styles.wrapper_gradients_gradient} />
          <div className={styles.wrapper_gradients_gradient2} />
          <div className={styles.wrapper_gradients_elipse} />
        </div>
        {children}
      </main>
    </>
  );
};
