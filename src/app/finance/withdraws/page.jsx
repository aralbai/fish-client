"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, ArrowRightAlt, Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { handleDelete } from "@/utils/handleDelete";
import { format } from "date-fns";

export default function Withdraws() {
  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    fetchData("/withdraws", setWithdraws);
  }, []);

  let total = 0;
  withdraws.forEach((withdraw) => {
    total += withdraw.amount;
  });

  return (
    <div className={styles.withdraws}>
      <h1>Снятия</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все снятия</h1>
          <Link href="/finance/withdraws/add-withdraw">
            <Add />
            Создать новый
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <td>Сумма</td>
              <td>Кому</td>
              <td>Дата</td>
              <td>Действие</td>
            </tr>
          </thead>
          <tbody>
            <tr style={{ backgroundColor: "#4E5CA0", color: "#fff" }}>
              <td>{Intl.NumberFormat("ru-RU").format(total)}</td>
              <td></td>
              <td></td>
              <td className={styles.action}>
                <Link href="/withdraws">
                  <ArrowRightAlt />
                </Link>
              </td>
            </tr>
            {withdraws?.map((withdraw) => (
              <tr key={withdraw._id}>
                <td>{Intl.NumberFormat("ru-RU").format(withdraw.amount)}</td>
                <td>{withdraw.toWhom}</td>
                <td>{format(withdraw.addedDate, "dd.MM.yyyy")}</td>
                <td className={styles.action}>
                  <Link
                    href={{
                      pathname: "/withdraws/edit-withdraw",
                      query: { withdrawId: withdraw._id },
                    }}
                  >
                    <Edit />
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        "/withdraws",
                        withdraw._id,
                        withdraws,
                        setWithdraws
                      )
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
