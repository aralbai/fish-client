import { handleChange } from "@/utils/handleChange";
import styles from "./Input.module.scss";

export default function Input({
  type,
  name,
  placeholder,
  value,
  setData,
  required,
  max,
}) {
  return (
    <div className={styles.input}>
      {max ? (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e, setData)}
          required={required}
          max={max}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e, setData)}
          required={required}
        />
      )}
    </div>
  );
}
