"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, ArrowRightAlt } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import TableTop from "@/components/tableTop/TableTop";

export default function Custumers() {
  const [custumers, setCustumers] = useState([]);
  const [sells, setSells] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData("/custumers", setCustumers);
    fetchData("/sells", setSells);
  }, []);

  const debtMap = sells?.sells?.reduce((acc, sell) => {
    acc[sell?.custumer?.id] = (acc[sell?.custumer?.id] || 0) + sell?.debt;
    return acc;
  }, {});

  return (
    <div className={styles.custumers}>
      <h1>Клиенты</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все клиенты</h1>
          <Link href="/custumers/add-custumer">
            <Add />
            <p>Тазасын киритиў</p>
          </Link>
        </div>

        <TableTop tableRef={tableRef} />

        <div className={styles.tableContainer}>
          <table ref={tableRef}>
            <thead>
              <tr>
                <td>Клиент</td>
                <td>Номер тел.</td>
                <td>Адрес</td>
                <td>Лимит</td>
                <td>Қарызлар</td>
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
                    {custumer.limit === -1
                      ? "Безлимитный"
                      : Intl.NumberFormat("ru-RU").format(custumer.limit)}
                  </td>
                  <td>
                    {(debtMap[custumer?._id] &&
                      Intl.NumberFormat("ru-RU").format(
                        debtMap[custumer?._id]
                      )) ||
                      0}
                  </td>
                  <td className={styles.action}>
                    <Link
                      href={{
                        pathname: "/custumers/single-custumer",
                        query: { custumerId: custumer._id },
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
        {custumers.length < 1 && (
          <div className={styles.empty}>Этот раздел пуст.</div>
        )}
      </div>
    </div>
  );
}
