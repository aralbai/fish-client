import styles from "./PurchasesFilter.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Close } from "@mui/icons-material";

export default function PurchasesFilter({
  isModalOpen,
  setIsModalOpen,
  products,
  suppliers,
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
        <label htmlFor="">Продукта</label>
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
        <label htmlFor="">Поставщик</label>
        <select
          name="supplier"
          value={`${filters.supplier.id}-${filters.supplier.title}`}
          onChange={handleChange}
        >
          <option value="all">Все</option>
          {suppliers?.map((supplier) => (
            <option
              key={supplier?._id}
              value={`${supplier?._id}-${supplier?.title}`}
            >
              {supplier?.title}
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
          <option value="active">Активный</option>
          <option value="deactive">Неактивный</option>
          <option value="shortage">Недостаток</option>
        </select>
      </li>
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
