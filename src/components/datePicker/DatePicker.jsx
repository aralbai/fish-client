import styles from "./DatePicker.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePick({ defDate, setDate }) {
  return (
    <div className={styles.datePick}>
      <DatePicker
        selected={defDate}
        onChange={(date) =>
          setDate((prev) => ({
            ...prev,
            addedDate: date,
          }))
        }
        className={styles.dateInput}
        wrapperClassName={styles.wrappedDateInput}
      />
    </div>
  );
}
