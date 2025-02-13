import styles from "./DatePicker.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePick({ defDate, setDate }) {
  return (
    <div>
      <DatePicker
        selected={defDate}
        onChange={(date) =>
          setDate((prev) => ({
            ...prev,
            addedDate: date,
          }))
        }
        className={styles.dateInput}
      />
    </div>
  );
}
