import styles from "./SellsFilter.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Close } from "@mui/icons-material";

export default function SellsFilter({
  isModalOpen,
  setIsModalOpen,
  products,
  custumers,
  filters,
  setFilters,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value === "all") {
      setFilters((prev) => ({
        ...prev,
        [name]: {
          id: "",
          title: "Все",
        },
      }));
    } else {
      const values = value.split("-");

      setFilters((prev) => ({
        ...prev,
        [name]: {
          id: values[0],
          title: values[1],
        },
      }));
    }
  };

  if (!isModalOpen) return null;

  return (
    <ul className={styles.purchasesFilter}>
      <li>
        <label htmlFor="">Продукт</label>
        <select
          name="product"
          value={`${filters.product.id}-${filters.product.title}`}
          onChange={handleChange}
        >
          <option value="all">Все</option>
          {products?.map((product) => (
            <option
              key={product?._id}
              value={`${product?._id}-${product?.title}`}
            >
              {product?.title}
            </option>
          ))}
        </select>
      </li>
      <li>
        <label htmlFor="">Клиент</label>
        <select
          name="custumer"
          value={`${filters.custumer.id}-${filters.custumer.fullname}`}
          onChange={handleChange}
        >
          <option value="all">Все</option>
          {custumers?.map((custumer) => (
            <option
              key={custumer?._id}
              value={`${custumer?._id}-${custumer?.fullname}`}
            >
              {custumer?.fullname}
            </option>
          ))}
        </select>
      </li>
      <li>
        <label htmlFor="">Статус</label>
        <select
          value={filters?.status}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              status: e.target.value,
            }))
          }
        >
          <option value="">Все</option>
          <option value="debts">Қарызлар</option>
        </select>
      </li>
      <li>
        <label htmlFor="">Басланыўы</label>

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
        <label htmlFor="">Тамамланыўы</label>

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
      <li>
        <button onClick={() => setIsModalOpen((prev) => !prev)}>
          <Close />
        </button>
      </li>
    </ul>
  );
}
