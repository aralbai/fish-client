"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { handleDelete } from "@/utils/handleDelete";
import { format } from "date-fns";

export default function Outcomes() {
  const [outcomes, setoutcomes] = useState([]);

  useEffect(() => {
    fetchData("/outcomes", setoutcomes);
  }, []);

  return (
    <div className={styles.outcomes}>
      <h1>Клиенты</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все клиенты</h1>
          <Link href="/finance/outcomes/add-outcome">
            <Add />
            Создать новый
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <td>Сумма</td>
              <td>Куда</td>
              <td>Дата</td>
              <td>Действие</td>
            </tr>
          </thead>
          <tbody>
            {outcomes?.map((outcome) => (
              <tr key={outcome._id}>
                <td>{Intl.NumberFormat("ru-RU").format(outcome.amount)}</td>
                <td>{outcome.purpose}</td>
                <td>{format(outcome.addedDate, "dd.MM.yyyy")}</td>
                <td className={styles.action}>
                  <Link
                    href={{
                      pathname: "/outcomes/edit-outcome",
                      query: { outcomeId: outcome._id },
                    }}
                  >
                    <Edit />
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        "/outcomes",
                        outcome._id,
                        outcomes,
                        setoutcomes
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
