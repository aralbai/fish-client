"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { handleDelete } from "@/utils/handleDelete";
import { format } from "date-fns";

export default function Debts() {
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    fetchData("/sells/debt", setDebts);
  }, []);

  return (
    <div className={styles.products}>
      <h1>Покупки</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все покупки</h1>
          <Link href="/debts/add-debt">
            <Add />
            Создать новый
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <td>Product</td>
              <td>Custumer</td>
              <td>Количество</td>
              <td>Discount</td>
              <td>Цена</td>
              <td>Qarz</td>
              <td>RA</td>
              <td>Дата</td>
              <td>Действие</td>
            </tr>
          </thead>
          <tbody>
            {debts?.map((debt) => (
              <tr key={debt._id}>
                <td>{debt.product?.title}</td>
                <td>{debt.custumer?.fullname}</td>
                <td>{debt.amount}</td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format(debt.discount)
                    .replace(/,/g, " ")}
                </td>
                <td>
                  {" "}
                  {Intl.NumberFormat("uz-UZ")
                    .format(debt.price)
                    .replace(/,/g, " ")}
                </td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format(debt.debt)
                    .replace(/,/g, " ")}
                </td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format(debt.price - debt.debt)
                    .replace(/,/g, " ")}
                </td>
                <td>{format(debt.addedDate, "dd.MM.yyyy")}</td>
                <td className={styles.action}>
                  <Link
                    href={{
                      pathname: "/debts/edit-debt",
                      query: { debtId: debt._id },
                    }}
                  >
                    <Edit />
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete("/debts", debt._id, debts, setDebts)
                    }
                  >
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
