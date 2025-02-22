"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { handleDelete } from "@/utils/handleDelete";
import { format } from "date-fns";

export default function Flow() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchData("/purchases/active", setPurchases);
  }, []);

  console.log(purchases);
  return (
    <div className={styles.products}>
      <h1>Покупки</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все покупки</h1>
          <Link href="/purchases/add-purchase">
            <Add />
            Создать новый
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <td>Название</td>
              <td>Поставщик</td>
              <td>Номер</td>
              <td>Количество</td>
              <td>Per kilo</td>
              <td>Discount</td>
              <td>Цена</td>
              <td>RA</td>
              <td>Дата</td>
              <td>Действие</td>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase._id}>
                <td>{purchase.product?.title}</td>
                <td>{purchase.supplier?.title}</td>
                <td>{purchase.carNumber}</td>
                <td>{purchase.amount}</td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format(
                      (purchase.price + purchase.discount) / purchase.amount
                    )
                    .replace(/,/g, " ")}
                </td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format(purchase.discount)
                    .replace(/,/g, " ")}
                </td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format(purchase.price)
                    .replace(/,/g, " ")}{" "}
                </td>
                <td>{purchase.remainingAmount}</td>
                <td>{format(purchase.addedDate, "dd.MM.yyyy")}</td>
                <td className={styles.action}>
                  <Link
                    href={{
                      pathname: "/purchases/edit-purchase",
                      query: { purchaseId: purchase._id },
                    }}
                  >
                    <Edit />
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        "/purchases",
                        purchase._id,
                        purchases,
                        setPurchases
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
