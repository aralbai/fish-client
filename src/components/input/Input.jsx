import { handleChange } from "@/utils/handleChange";
import styles from "./Input.module.scss";

export default function Input({ type, name, placeholder, value, setData }) {
  return (
    <div className={styles.input}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e, setData)}
        required
      />
    </div>
  );
}
