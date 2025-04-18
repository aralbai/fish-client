"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { ArrowRightAlt, KeyboardBackspace } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { format } from "date-fns";
import TableTop from "@/components/tableTop/TableTop";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import Pagination from "@/components/pagination/Pagination";

export default function Debts() {
  const [debts, setDebts] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData("/sells/debt", setDebts);
  }, []);

  // page number and total pages for pagination
  const [totalDocuments, setTotalDocuments] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 1. Guruhlash xaridor va sana bo‘yicha
  const grouped = {};

  debts?.forEach((p) => {
    const customerName = p.custumer?.fullname || "No Name";
    const date = new Date(p.addedDate).toISOString().split("T")[0]; // YYYY-MM-DD

    const key = `${customerName}-${date}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(p);
  });

  const rows = Object.entries(grouped); // [ [key, purchases], ... ]

  return (
    <ProtectedRoute>
      <div className={styles.products}>
        <h1>Қарызлар</h1>

        <div className={styles.table}>
          <div className={styles.top}>
            <h1>Қарызлар</h1>

            <Link href="/">
              <KeyboardBackspace />

              <p>Артқа қайтыў</p>
            </Link>
          </div>

          <TableTop tableRef={tableRef} />

          <div className={styles.tableContainer}>
            <table ref={tableRef}>
              <thead>
                <tr>
                  <td>H</td>
                  <td>Клиент</td>
                  <td>Продукт</td>
                  <td>Муғдары</td>
                  <td>Сумма</td>
                  <td>Итого</td>
                  <td>Қарыз</td>
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
                            {p.totalPrice
                              ? Intl.NumberFormat("ru-RU").format(p.totalPrice)
                              : 0}
                          </td>
                          {index === 0 && (
                            <>
                              <td rowSpan={group.length}>
                                {total
                                  ? Intl.NumberFormat("ru-RU").format(total)
                                  : 0}
                              </td>
                              <td rowSpan={group.length}>
                                {totalDebt
                                  ? Intl.NumberFormat("ru-RU").format(totalDebt)
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
              title={"Всего продаж:"}
            />
          </div>

          {debts.length < 1 && (
            <div className={styles.empty}>Этот раздел пуст.</div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
