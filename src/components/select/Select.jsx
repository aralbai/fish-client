import { handleChange } from "@/utils/handleChange";
import styles from "./Select.module.scss";

export default function Select({ name, mapData, text, defValue, setData }) {
  return (
    <div className={styles.input}>
      <select
        value={defValue}
        name={name}
        onChange={(e) => handleChange(e, setData)}
        required
      >
        <option value="" hidden>
          {defValue}
        </option>
        {mapData.map((opt) => (
          <option key={opt._id} value={opt._id}>
            {opt[text]}
          </option>
        ))}
      </select>
    </div>
  );
}
