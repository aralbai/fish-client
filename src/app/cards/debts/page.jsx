"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { ArrowRightAlt, KeyboardBackspace } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { format } from "date-fns";
import TableTop from "@/components/tableTop/TableTop";

export default function Debts() {
  const [debts, setDebts] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData("/sells/debt", setDebts);
  }, []);

  return (
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
                <td>Продукт</td>
                <td>Клиент</td>
                <td>Сумма</td>
                <td>Қарыз</td>
                <td>Сәне</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {debts?.map((debt) => (
                <tr key={debt._id}>
                  <td>{debt.product?.title}</td>
                  <td>{debt.custumer?.fullname}</td>
                  <td>
                    {Intl.NumberFormat("uz-UZ")
                      .format(debt.totalPrice)
                      .replace(/,/g, " ")}
                  </td>
                  <td>
                    {Intl.NumberFormat("uz-UZ")
                      .format(debt.debt)
                      .replace(/,/g, " ")}
                  </td>
                  <td>{format(debt.addedDate, "dd.MM.yyyy")}</td>
                  <td className={styles.action}>
                    <Link
                      href={{
                        pathname: "/sells/single-sell",
                        query: { sellId: debt._id },
                      }}
                    >
                      <ArrowRightAlt />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {debts.length < 1 && (
          <div className={styles.empty}>Этот раздел пуст.</div>
        )}
      </div>
    </div>
  );
}
