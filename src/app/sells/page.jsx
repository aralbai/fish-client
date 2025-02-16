"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fetchData } from "@/utils/fetchData";
import { handleDelete } from "@/utils/handleDelete";

export default function Sells() {
  const [sells, setSells] = useState([]);

  useEffect(() => {
    fetchData("/sells", setSells);
  }, []);

  return (
    <div className={styles.products}>
      <h1>Продажи</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все продажи</h1>
          <Link href="/sells/add-sell">
            <Add />
            Создать новый
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <td>Название продукта</td>
              <td>Клиент</td>
              <td>Количество</td>
              <td>Per kilo</td>
              <td>Discount</td>
              <td>Цена</td>
              <td>Дата добавления</td>
              <td>Движение</td>
            </tr>
          </thead>
          <tbody>
            {sells.map((sell) => (
              <tr key={sell._id}>
                <td>{sell.product.title}</td>
                <td>{sell.custumer.fullname}</td>
                <td>{sell.amount}</td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format((sell.price + sell.discount) / sell.amount)
                    .replace(/,/g, " ")}
                </td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format(sell.discount)
                    .replace(/,/g, " ")}
                </td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format(sell.price)
                    .replace(/,/g, " ")}{" "}
                </td>
                <td>{format(sell.addedDate, "dd.MM.yyyy")}</td>
                <td className={styles.action}>
                  <Link
                    href={{
                      pathname: "/sells/edit-supplier",
                      query: {
                        sellId: sell._id,
                      },
                    }}
                  >
                    <Edit />
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete("/sells", sell._id, sells, setSells)
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
