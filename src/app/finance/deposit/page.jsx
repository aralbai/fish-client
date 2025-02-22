"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { handleDelete } from "@/utils/handleDelete";

export default function Deposit() {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    fetchData("/incomes", setIncomes);
  }, []);

  return (
    <div className={styles.incomes}>
      <h1>Клиенты</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все клиенты</h1>
          <Link href="/incomes/add-custumer">
            <Add />
            Создать новый
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <td>Имя клиента</td>
              <td>Номер телефона</td>
              <td>Адрес</td>
              <td>Лимит</td>
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
