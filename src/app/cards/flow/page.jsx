"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { ArrowRightAlt, KeyboardBackspace } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { format } from "date-fns";
import TableTop from "@/components/tableTop/TableTop";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

export default function Flow() {
  const [purchases, setPurchases] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData("/purchases/active", setPurchases);
  }, []);

  // 1. Guruhlash xaridor va sana bo‘yicha
  const grouped = {};

  purchases?.forEach((p) => {
    const supplierName = p.supplier?.title || "No Name";
    const date = new Date(p.addedDate).toISOString().split("T")[0]; // YYYY-MM-DD

    const key = `${supplierName}-${date}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(p);
  });

  const rows = Object.entries(grouped); // [ [key, purchases], ... ]

  useEffect(() => {
    fetchData("/purchases/active", setPurchases);
  }, []);

  return (
    <ProtectedRoute>
      <div className={styles.products}>
        <h1>Склад</h1>

        <div className={styles.table}>
          <div className={styles.top}>
            <h1>Склад</h1>

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
                  <td>Н</td>
                  <td>Сатыўшы</td>
                  <td>Продукт</td>
                  <td>Муғдары</td>
                  <td>Баҳасы</td>
                  <td>Сумма</td>
                  <td>Скидка</td>
                  <td>Кемшилик</td>
                  <td>Қалдық</td>
                  <td>Итого</td>
                  <td>Сәне</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {purchases.length > 0 ? (
                  rows.map(([key, group], i) => {
                    const total = group.reduce(
                      (sum, p) => sum + p.totalPrice,
                      0
                    );

                    return (
                      <React.Fragment key={key}>
                        {group.map((p, index) => (
                          <tr key={p._id}>
                            {index === 0 && (
                              <>
                                <td rowSpan={group.length}>{i + 1}</td>
                                <td rowSpan={group.length}>
                                  {p.supplier.title}
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
                                ? Intl.NumberFormat("ru-RU").format(p.price)
                                : 0}
                            </td>
                            <td>
                              {p.totalPrice
                                ? Intl.NumberFormat("ru-RU").format(
                                    p.totalPrice
                                  )
                                : 0}
                            </td>
                            <td>
                              {p.discount
                                ? Intl.NumberFormat("ru-RU").format(p.discount)
                                : 0}
                            </td>
                            <td>
                              {p.shortage
                                ? Intl.NumberFormat("ru-RU").format(p.shortage)
                                : 0}
                            </td>
                            <td>
                              {p.remainingAmount
                                ? Intl.NumberFormat("uz-UZ")
                                    .format(p.remainingAmount / 1000)
                                    .replace(/,/g, " ")
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
                                  {format(new Date(p.addedDate), "dd.MM.yyyy")}
                                </td>
                              </>
                            )}
                            <td className={styles.action}>
                              <Link
                                href={{
                                  pathname: "/purchases/single-purchase",
                                  query: { purchaseId: p._id },
                                }}
                              >
                                <ArrowRightAlt />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td style={{ padding: "30px 20px", width: "maxContent" }}>
                      Этот раздел пуст.
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
