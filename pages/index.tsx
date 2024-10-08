import { useState } from "react";
import { Button } from "../Components/Button/Button";
import { Input } from "../Components/Input/Input";
import { Layout } from "../Components/Lyaout/Lyaout";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.scss";

const WelcomePage = () => {
  const [name, setName] = useState("");

  const router = useRouter();

  const { setInlocalStorageAndStore } = useLocalStorageState();

  const handleNavigate = (path: string) => {
    router.push(path);
    setInlocalStorageAndStore(name);
  };

  return (
    <Layout>
      <div className={styles.form}>
        <div className={styles.form_inputs}>
          <label className={styles.form_inputs_label}>Начать</label>
          <Input
            label="Ваше имя"
            value={name}
            placeHolder="Как вас зовут?"
            onChange={(val: string) => setName(val)}
          />
        </div>
        <div className={styles.form_navigation}>
          <Button
            onClick={() => handleNavigate("/calculate")}
            label="Открыть калькулятор"
          />
          <Button
            onClick={() => handleNavigate("/password-generator")}
            label="Открыть генератор"
          />
        </div>
      </div>
    </Layout>
  );
};

export default WelcomePage;
