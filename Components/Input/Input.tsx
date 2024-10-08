import styles from "./Input.module.scss";

interface InputProps {
  placeHolder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  maxValue?: number;
}

export const Input = ({
  onChange,
  placeHolder,
  value,
  label,
  maxValue,
}: InputProps) => {
  return (
    <>
      {label && <label className={styles.label}>{label}</label>}
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        max={maxValue}
        className={styles.input}
        type="text"
        placeholder={placeHolder}
      />
    </>
  );
};
