"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, ArrowRightAlt, FilterList } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { fetchData } from "@/utils/fetchData";
import TableTop from "@/components/tableTop/TableTop";
import SellsFilter from "@/components/filters/sellsFilter/SellsFilter";
import axios from "axios";
import Pagination from "@/components/pagination/Pagination";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

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
    startDate: new Date(2025, 0, 1, 0, 0, 0),
    endDate: new Date(),
  });
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const tableRef = useRef(null);

  // page number and total pages for pagination
  const [totalDocuments, setTotalDocuments] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 1. Guruhlash xaridor va sana bo‘yicha
  const grouped = {};

  sells?.forEach((p) => {
    const customerName = p.custumer?.fullname || "No Name";
    const date = new Date(p.addedDate).toISOString().split("T")[0]; // YYYY-MM-DD

    const key = `${customerName}-${date}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(p);
  });

  const rows = Object.entries(grouped); // [ [key, purchases], ... ]

  useEffect(() => {
    fetchData("/products", setProducts);
    fetchData("/custumers", setCustumers);

    const fetchSells = async () => {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/sells?productId=${filters?.product?.id}&custumerId=${filters?.custumer?.id}&status=${filters?.status}&startDate=${filters?.startDate}&endDate=${filters?.endDate}&page=${page}&limi=50`
        )
        .then((res) => {
          setSells(res.data.sells);
          setTotalPages(res.data.totalPages);
          setTotalDocuments(res.data.total);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchSells();
  }, [filters, totalPages, page]);

  return (
    <ProtectedRoute>
      <div className={styles.products}>
        <h1>Сатыў</h1>

        <div className={styles.table}>
          <div className={styles.top}>
            <h1>Сатыў</h1>
            <Link href="/sells/add-sell">
              <Add />
              <p>Тазасын киритиў</p>
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

          <div className={styles.tableContainer}>
            <table ref={tableRef}>
              <thead>
                <tr>
                  <td>Н</td>
                  <td>Клиент</td>
                  <td>Продукт</td>
                  <td>Муғдары</td>
                  <td>Баҳасы</td>
                  <td>Сумма</td>
                  <td>Скидка</td>
                  <td>Қарыз</td>
                  <td>Итого</td>
                  <td>Сәне</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {rows.map(([key, group], i) => {
                  const total = group.reduce((sum, p) => sum + p.totalPrice, 0);
                  const totalDebt = group.reduce((sum, p) => sum + p.debt, 0);

                  return (
                    <React.Fragment key={key}>
                      {group.map((p, index) => (
                        <tr key={p._id}>
                          {index === 0 && (
                            <>
                              <td rowSpan={group.length}>{i + 1}</td>
                              <td rowSpan={group.length}>
                                {p.custumer.fullname}
                              </td>
                            </>
                          )}
                          <td>{p.product.title}</td>
                          <td>
                            {p.amount
                              ? Intl.NumberFormat("uz-UZ")
                                  .format(p.amount / 1000)
                                  .replace(/,/g, " ")
                              : 0}
                          </td>
                          <td>
                            {p.price
                              ? Intl.NumberFormat("ru-RU")
                                  .format(p.price)
                                  .replace(/,/g, " ")
                              : 0}
                          </td>
                          <td>
                            {p.totalPrice
                              ? Intl.NumberFormat("ru-RU")
                                  .format(p.totalPrice)
                                  .replace(/,/g, " ")
                              : 0}
                          </td>
                          <td>
                            {p.discount
                              ? Intl.NumberFormat("uz-UZ")
                                  .format(p.discount)
                                  .replace(/,/g, " ")
                              : 0}
                          </td>
                          <td>
                            {p.debt
                              ? Intl.NumberFormat("uz-UZ")
                                  .format(p.debt)
                                  .replace(/,/g, " ")
                              : 0}
                          </td>
                          {index === 0 && (
                            <>
                              <td rowSpan={group.length}>
                                {total
                                  ? Intl.NumberFormat("ru-RU")
                                      .format(total)
                                      .replace(/,/g, " ")
                                  : 0}
                              </td>

                              <td rowSpan={group.length}>
                                {format(new Date(p.addedDate), "dd.MM.yyyy")}
                              </td>
                            </>
                          )}
                          <td className={styles.action}>
                            <Link
                              href={{
                                pathname: "/sells/single-sell",
                                query: { sellId: p._id },
                              }}
                            >
                              <ArrowRightAlt />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>

            <Pagination
              page={page}
              totalPages={totalPages}
              totalDocuments={totalDocuments}
              setPage={setPage}
              title={"Все:"}
            />
          </div>

          {sells?.length < 1 && (
            <div className={styles.empty}>Этот раздел пуст.</div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
