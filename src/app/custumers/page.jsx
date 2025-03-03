"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { handleDelete } from "@/utils/handleDelete";
import TableTop from "@/components/tableTop/TableTop";

export default function Custumers() {
  const [custumers, setCustumers] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData("/custumers", setCustumers);
  }, []);

  return (
    <div className={styles.custumers}>
      <h1>Клиенты</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все клиенты</h1>
          <Link href="/custumers/add-custumer">
            <Add />
            Создать новый
          </Link>
        </div>

        <TableTop tableRef={tableRef} />

        <table ref={tableRef}>
          <thead>
            <tr>
              <td>Имя клиента</td>
              <td>Номер телефона</td>
              <td>Адрес</td>
              <td>Лимит</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {custumers?.map((custumer) => (
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
                      pathname: "/custumers/edit-custumer",
                      query: { custumerId: custumer._id },
                    }}
                  >
                    <Edit />
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        "/custumers",
                        custumer._id,
                        custumers,
                        setCustumers
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
        {custumers.length < 1 && (
          <div className={styles.empty}>Этот раздел пуст.</div>
        )}
      </div>
    </div>
  );
}
