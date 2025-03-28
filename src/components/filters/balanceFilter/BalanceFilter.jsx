import styles from "./BalanceFilter.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Close } from "@mui/icons-material";

export default function BalanceFilter({
  isModalOpen,
  setIsModalOpen,
  filters,
  setFilters,
}) {
  if (!isModalOpen) return null;

  return (
    <ul className={styles.balanceFilter}>
      <li>
        <label htmlFor="">Начало</label>

        <DatePicker
          selected={new Date(filters?.startDate)}
          onChange={(date) =>
            setFilters((prev) => ({
              ...prev,
              startDate: new Date(date),
            }))
          }
          dateFormat="dd.MM.yyyy"
          className={styles.dateInput}
          wrapperClassName={styles.wrappedDateInput}
        />
      </li>
      <li>
        <label htmlFor="">Окончание</label>

        <DatePicker
          selected={new Date(filters?.endDate)}
          onChange={(date) =>
            setFilters((prev) => ({
              ...prev,
              endDate: new Date(date),
            }))
          }
          dateFormat="dd.MM.yyyy"
          className={styles.dateInput}
          wrapperClassName={styles.wrappedDateInput}
        />
      </li>
      <li className={styles.close}>
        <button onClick={() => setIsModalOpen((prev) => !prev)}>
          <Close />
        </button>
      </li>
    </ul>
  );
}
