import { useState } from "react";

import { Input } from "../Components/Input/Input";
import { CheckBox } from "../Components/CheckBox/CheckBox";
import { Button } from "../Components/Button/Button";
import { Copied } from "../Components/Copied/Copied";
import { Heading } from "../Components/Heading/Heading";
import { Layout } from "../Components/Lyaout/Lyaout";

import styles from "../styles/PasswordGenerator.module.scss";

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "%*?)@$#~";

const PasswordGenerator = () => {
  const [password, setPassword] = useState<string[]>([]);
  const [length, setLength] = useState("");
  const [useUppercase, setUseUppercase] = useState(false);
  const [useLowercase, setUseLowercase] = useState(false);
  const [useNumbers, setUseNumbers] = useState(false);
  const [useSymbols, setUseSymbols] = useState(false);
  const [avoidRepeat, setAvoidRepeat] = useState(false);

  const MOK_LIST = [
    {
      label: "Использовать прописные буквы",
      name: "lowercase",
      onchange: setUseLowercase,
    },
    {
      label: "Использовать строчные буквы",
      name: "uppercase",
      onchange: setUseUppercase,
    },
    { label: "Использовать цифры", name: "numbers", onchange: setUseNumbers },
    {
      label: "Использовать символы: %, *, ), ?, @, #, $, ~",
      name: "symbols",
      onchange: setUseSymbols,
    },
    {
      label: "Избегать повторения символов",
      name: "avoidRepeat",
      onchange: setAvoidRepeat,
    },
  ];

  const generatePass = (
    length: number,
    useUppercase: boolean,
    useLowercase: boolean,
    useNumbers: boolean,
    useSymbols: boolean
  ) => {
    let charSet = "";

    charSet = useUppercase ? charSet + uppercaseChars : charSet;
    charSet = useLowercase ? charSet + lowercaseChars : charSet;
    charSet = useNumbers ? charSet + numberChars : charSet;
    charSet = useSymbols ? charSet + symbolChars : charSet;

    if (charSet.length === 0) {
      return;
    }

    const getPass = () => {
      const usedChars: Set<string> = new Set();

      if (!length || (!length && !avoidRepeat)) {
        return "";
      }

      return Array.from({ length }, () => {
        let randomChar: string;

        do {
          const randomIndex = Math.floor(Math.random() * charSet.length);
          randomChar = charSet[randomIndex];
        } while (avoidRepeat && usedChars.has(randomChar));

        avoidRepeat && usedChars.add(randomChar);

        return randomChar;
      }).join("");
    };

    const pass = Array.from({ length: 4 }, () => {
      return getPass();
    });

    setPassword(pass);
  };

  return (
    <Layout>
      <div className={styles.content}>
        <Heading>Генератор паролей</Heading>
        <div className={styles.content_container}>
          <div className={styles.border}>
            <div className={styles.content_container_generate}>
              <label className={styles.content_container_generate_label}>
                Длина пароля
              </label>
              <Input
                maxValue={
                  avoidRepeat
                    ? +useUppercase * 26 +
                      +useLowercase * 26 +
                      +useNumbers * 10 +
                      +useSymbols * 8
                    : undefined
                }
                onChange={(value: string) => {
                  setLength((prev) => (!isNaN(+value) ? value : prev));
                }}
                value={length}
                placeHolder="Введите число"
              />
              {MOK_LIST.map((el) => (
                <CheckBox
                  onChange={(checked: boolean) => el.onchange(checked)}
                  key={el.name}
                  label={el.label}
                  name={el.name}
                  disabled={
                    el.name === "avoidRepeat" &&
                    +useUppercase * 26 +
                      +useLowercase * 26 +
                      +useNumbers * 10 +
                      +useSymbols * 8 <
                      +length
                  }
                />
              ))}
            </div>
            <div className={styles.content_container_generate_buttonWrapper}>
              <Button
                label="Сгенерировать пароли"
                onClick={() =>
                  generatePass(
                    +length,
                    useUppercase,
                    useLowercase,
                    useNumbers,
                    useSymbols
                  )
                }
              />
            </div>
          </div>
          <div
            className={`${styles.border} ${styles.content_container_result}`}
          >
            <label className={styles.content_container_result_label}>
              Результаты
            </label>
            {password.map((el) => el && <Copied key={el} text={el} />)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PasswordGenerator;
