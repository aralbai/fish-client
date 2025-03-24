"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, ArrowRightAlt, FilterList } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { fetchData } from "@/utils/fetchData";
import TableTop from "@/components/tableTop/TableTop";
import SellsFilter from "@/components/filters/sellsFilter/SellsFilter";
import { getFirstDayOfMonthThisYear } from "@/utils/getFirstDay";

export default function Sells() {
  const [sells, setSells] = useState([]);
  const [products, setProducts] = useState([]);
  const [custumers, setCustumers] = useState([]);
  const [filters, setFilters] = useState({
    product: {
      id: "",
      title: "Все",
    },
    custumer: {
      id: "",
      title: "Все",
    },
    status: "",
    startDate: getFirstDayOfMonthThisYear(),
    endDate: new Date(),
  });
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const tableRef = useRef(null);

  useEffect(() => {
    fetchData("/products", setProducts);
    fetchData("/custumers", setCustumers);

    fetchData(
      `/sells?productId=${filters?.product?.id}&custumerId=${filters?.custumer?.id}&status=${filters?.status}&startDate=${filters?.startDate}&endDate=${filters?.endDate}`,
      setSells
    );
  }, [filters]);

  return (
    <div className={styles.products}>
      <h1>Продажи</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все продажи</h1>
          <Link href="/sells/add-sell">
            <Add />
            Создать новый
          </Link>
        </div>

        <div className={styles.tableTop}>
          <div className={styles.filter}>
            <button onClick={() => setFilterModalOpen((prev) => !prev)}>
              <FilterList /> Фильтр
            </button>
            <SellsFilter
              isModalOpen={filterModalOpen}
              setIsModalOpen={setFilterModalOpen}
              products={products}
              custumers={custumers}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <TableTop tableRef={tableRef} />
        </div>

        <table ref={tableRef}>
          <thead>
            <tr>
              <td>Продукта</td>
              <td>Клиент</td>
              <td>Количество</td>
              <td>Скидка</td>
              <td>Сумма</td>
              <td>Долг</td>
              <td>Дата</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {sells.map((sell) => (
              <tr key={sell._id}>
                <td>{sell.product.title}</td>
                <td>{sell.custumer?.fullname}</td>
                <td>{sell.amount}</td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format(sell.discount)
                    .replace(/,/g, " ")}
                </td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format(sell.totalPrice)
                    .replace(/,/g, " ")}{" "}
                </td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format(sell.debt)
                    .replace(/,/g, " ")}{" "}
                </td>
                <td>{format(sell.addedDate, "dd.MM.yyyy")}</td>
                <td className={styles.action}>
                  <Link
                    href={{
                      pathname: "/sells/single-sell",
                      query: {
                        sellId: sell._id,
                      },
                    }}
                  >
                    <ArrowRightAlt />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sells.length < 1 && (
          <div className={styles.empty}>Этот раздел пуст.</div>
        )}
      </div>
    </div>
  );
}
