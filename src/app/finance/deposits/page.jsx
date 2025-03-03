"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, ArrowRightAlt, Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { handleDelete } from "@/utils/handleDelete";
import { format } from "date-fns";

export default function Deposits() {
  const [deposites, setDeposites] = useState([]);

  useEffect(() => {
    fetchData("/deposits", setDeposites);
  }, []);

  let total = 0;
  deposites.forEach((deposit) => {
    total += deposit.amount;
  });

  return (
    <div className={styles.deposites}>
      <h1>Депозиты</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все депозиты</h1>
          <Link href="/finance/deposits/add-deposit">
            <Add />
            Создать новый
          </Link>
        </div>

        <table>
          <thead>
            <tr style={{ backgroundColor: "#4E5CA0", color: "#fff" }}>
              <td>{Intl.NumberFormat("ru-RU").format(total)}</td>
              <td></td>
              <td></td>
              <td style={{ padding: "30px" }}></td>
            </tr>
            <tr>
              <td>Сумма</td>
              <td>От кого</td>
              <td>Дата</td>
              <td>Действие</td>
            </tr>
          </thead>
          <tbody>
            {deposites?.map((outcome) => (
              <tr key={outcome._id}>
                <td>{Intl.NumberFormat("ru-RU").format(outcome.amount)}</td>
                <td>{outcome.purpose}</td>
                <td>{format(outcome.addedDate, "dd.MM.yyyy")}</td>
                <td className={styles.action}>
                  <Link
                    href={{
                      pathname: "/deposits/edit-outcome",
                      query: { outcomeId: outcome._id },
                    }}
                  >
                    <Edit />
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        "/deposits",
                        outcome._id,
                        deposites,
                        setDeposites
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
        {deposites.length < 1 && (
          <div className={styles.empty}>Этот раздел пуст.</div>
        )}
      </div>
    </div>
  );
}
