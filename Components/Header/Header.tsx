import Link from "next/link";
import { Icon } from "../../assets/Icon";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

import styles from "./Header.module.scss";

const MOK_NAV_LIST = [
  { path: "/", name: "Главная" },
  { path: "/calculate", name: "Калькулятор" },
  { path: "/password-generator", name: "Генератор паролей" },
];

export const Header = () => {
  const path = usePathname();
  const { name } = useLocalStorageState();

  return (
    <header className={styles.header}>
      <div className={styles.header_icon}>
        <Icon />
      </div>
      <nav>
        <ul className={styles.header_navigation}>
          {MOK_NAV_LIST.map((el) => (
            <li key={el.path}>
              <Link
                className={
                  el.path === path ? styles.header_navigation_active : ""
                }
                href={el.path}
              >
                {el.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.header_user}>
        {name || "Ваше имя"}
        <Image
          className={styles.header_user_avatar}
          alt="Аватар"
          width={32}
          height={32}
          src="/taylor.png"
        />
      </div>
    </header>
  );
};
