import { useEffect, useRef, useState } from "react";
import { evaluate } from "mathjs";
import { Heading } from "../Components/Heading/Heading";
import { Layout } from "../Components/Lyaout/Lyaout";
import { inter } from "../Components/CheckBox/CheckBox";

import styles from "../styles/calculate.module.scss";

const validOperators = ["+", "-", "÷", "%", "×"];

const Calculate = () => {
  const [expression, setExpression] = useState("6+2");
  const [result, setResult] = useState("123");
  const inputRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const trimmedExpression = expression.replace(/\s+/g, "");

    const regex = /([+\-]?\d+(\.\d+)?)([+\-×÷]?)$/;

    const match = trimmedExpression.match(regex);
    let modifiedExpression = "";

    if (match && match.index) {
      const lastNumber = match[1];

      const newSign = lastNumber.startsWith("-")
        ? lastNumber.substring(1)
        : "-" + lastNumber;

      modifiedExpression =
        trimmedExpression.slice(0, match.index) +
        newSign +
        trimmedExpression.slice(match.index + lastNumber.length);
    }
    setExpression(modifiedExpression);
  };

  const handlePreventDoubleOperators = (char: string) => {
    const lastChar = expression.at(-1);
    const isLastOperator = validOperators.some(
      (operator) => operator === lastChar
    );

    setExpression((prev) => (isLastOperator ? prev : prev + char));
  };

  const MOCK_BUTTONS = [
    {
      label: "C",
      classname: `${styles.button} ${inter.className} ${styles.button_grey}`,
      onclick: () => setExpression(""),
    },
    {
      label: "+/-",
      classname: `${styles.button} ${inter.className} ${styles.button_grey}`,
      onclick: handleClick,
    },
    {
      label: "%",
      classname: `${styles.button} ${inter.className} ${styles.button_grey}`,
      onclick: () => handlePreventDoubleOperators("%"),
    },
    {
      label: "÷",
      classname: `${styles.button} ${inter.className} ${styles.button_orange}`,
      onclick: () => handlePreventDoubleOperators("÷"),
    },
    {
      label: "7",
      classname: `${styles.button} ${inter.className} ${styles.button_black}`,
      onclick: () => setExpression((prev) => prev + "7"),
    },
    {
      label: "8",
      classname: `${styles.button} ${inter.className} ${styles.button_black}`,
      onclick: () => setExpression((prev) => prev + "8"),
    },
    {
      label: "9",
      classname: `${styles.button} ${inter.className} ${styles.button_black}`,
      onclick: () => setExpression((prev) => prev + "9"),
    },
    {
      label: "×",
      classname: `${styles.button} ${inter.className} ${styles.button_orange}`,
      onclick: () => handlePreventDoubleOperators("×"),
    },
    {
      label: "4",
      classname: `${styles.button} ${inter.className} ${styles.button_black}`,
      onclick: () => setExpression((prev) => prev + "4"),
    },
    {
      label: "5",
      classname: `${styles.button} ${inter.className} ${styles.button_black}`,
      onclick: () => setExpression((prev) => prev + "5"),
    },
    {
      label: "6",
      classname: `${styles.button} ${inter.className} ${styles.button_black}`,
      onclick: () => setExpression((prev) => prev + "6"),
    },
    {
      label: "–",
      classname: `${styles.button} ${inter.className} ${styles.button_orange}`,
      onclick: () => setExpression((prev) => prev + "-"),
    },
    {
      label: "1",
      classname: `${styles.button} ${inter.className} ${styles.button_black}`,
      onclick: () => setExpression((prev) => prev + "1"),
    },
    {
      label: "2",
      classname: `${styles.button} ${inter.className} ${styles.button_black}`,
      onclick: () => setExpression((prev) => prev + "2"),
    },
    {
      label: "3",
      classname: `${styles.button} ${inter.className} ${styles.button_black}`,
      onclick: () => setExpression((prev) => prev + "3"),
    },
    {
      label: "+",
      classname: `${styles.button} ${inter.className} ${styles.button_orange}`,
      onclick: () => handlePreventDoubleOperators("+"),
    },
    {
      label: "0",
      classname: `${styles.button} ${inter.className} ${styles.button_black} ${styles.button_double}`,
      onclick: () => setExpression((prev) => prev + "0"),
    },
    {
      label: ".",
      classname: `${styles.button} ${inter.className} ${styles.button_black}`,
      onclick: () => setExpression((prev) => prev + "."),
    },
    {
      label: "=",
      classname: `${styles.button} ${inter.className} ${styles.button_orange}`,
      onclick: () => {},
    },
  ];

  useEffect(() => {
    const formattedExpression = expression
      .replaceAll("÷", "/")
      .replaceAll("×", "*");

    let result = "";
    try {
      if (expression) {
        result = evaluate(formattedExpression);
        setResult((prev) => result ?? prev);
      } else {
        setResult("");
      }
    } catch (e) {}
  }, [expression]);

  const renderExpression = () => {
    return expression.split("").map((char, index) => {
      if (validOperators.includes(char)) {
        return (
          <span key={index} className={styles.orange}>
            {char}
          </span>
        );
      }
      return char;
    });
  };

  const moveCursorToEnd = () => {
    if (inputRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(inputRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let key = e.key;
    key = key === "*" ? "×" : key;
    key = key === "/" ? "÷" : key;
    setTimeout(moveCursorToEnd, 0);

    const validKeys = "0123456789+-×÷";
    const lastChar = expression[expression.length - 1];

    if (validKeys.includes(key)) {
      const isOperator = "+-×÷".includes(key);
      const isLastCharOperator = "+-×÷".includes(lastChar);

      if (isOperator && isLastCharOperator) {
        return;
      }

      setExpression((prev) => prev + key);
    } else if (key === "Backspace") {
      setExpression((prev) => prev.slice(0, -1));
    }

    e.preventDefault();
  };

  return (
    <Layout>
      <div className={styles.content}>
        <div className={styles.info}>
          <Heading>Калькулятор</Heading>
          <p className={styles.info_paragraph}>
            Очень Простой калькулятор обычный - только стандартные функции
            калькулятора: сложение, вычитание, умножение и деление. Простой
            калькулятор работает на смартфонах и ПК даже без интернета, не
            требует установки, быстро загружается и работает онлайн.
          </p>
        </div>
        <div className={styles.calculator}>
          <div className={styles.calculator_wrapper}>
            <div
              className={`${inter.className} ${styles.calculator_wrapper_result}`}
            >
              {result}
            </div>
            <div
              ref={inputRef}
              className={`${inter.className} ${styles.calculator_wrapper_inputs}`}
              contentEditable
              onKeyDown={handleKeyDown}
              suppressContentEditableWarning={true}
            >
              {renderExpression()}
            </div>
          </div>
          <div className={styles.calculator_buttons}>
            {MOCK_BUTTONS.map((el) => (
              <button
                key={el.label}
                onClick={el.onclick}
                className={el.classname}
              >
                {el.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculate;
