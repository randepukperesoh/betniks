import styles from "./CheckBox.module.scss";
import { Inter } from "@next/font/google";

export const inter = Inter({ subsets: ["latin"] });

interface CheckBoxProps {
  name?: string;
  label: string;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export const CheckBox = ({
  name,
  label,
  onChange,
  disabled,
}: CheckBoxProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        onChange={(e) => onChange(e.target.checked)}
        className={styles.input}
        type="checkBox"
        id={name}
        disabled={disabled}
      />
      <label
        htmlFor={name}
        className={`${inter.className} ${styles.wrapper_label}`}
      >
        {label}
      </label>
    </div>
  );
};
