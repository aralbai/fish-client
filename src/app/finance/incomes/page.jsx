"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { handleDelete } from "@/utils/handleDelete";

export default function Incomes() {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    fetchData("/incomes", setIncomes);
  }, []);

  return (
    <div className={styles.incomes}>
      <h1>Доходы</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все доходы</h1>
          <Link href="/finance/incomes/add-income">
            <Add />
            Создать новый
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <td>Сумма</td>
              <td>Откуда</td>
              <td>Дата</td>
              <td>Действие</td>
            </tr>
          </thead>
          <tbody>
            {incomes?.map((custumer) => (
              <tr key={custumer._id}>
                <td>{custumer.fullname}</td>
                <td>{custumer.phone}</td>
                <td>{custumer.address}</td>
                <td>
                  {custumer.limit === -1 ? "Безлимитный" : custumer.limit}
                </td>
                <td className={styles.action}>
                  <Link
                    href={{
                      pathname: "/incomes/edit-custumer",
                      query: { custumerId: custumer._id },
                    }}
                  >
                    <Edit />
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        "/incomes",
                        custumer._id,
                        incomes,
                        setIncomes
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
