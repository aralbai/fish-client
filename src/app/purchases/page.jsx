"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { handleDelete } from "@/utils/handleDelete";
import { format } from "date-fns";
import TableTop from "@/components/tableTop/TableTop";

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData("/purchases", setPurchases);
  }, []);

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

        <TableTop tableRef={tableRef} />

        <table ref={tableRef}>
          <thead>
            <tr>
              <td>Продукта</td>
              <td>Поставщик</td>
              <td>Ном</td>
              <td>Кол</td>
              <td>Скидка</td>
              <td>Цена</td>
              <td>Долг</td>
              <td>Недостаток</td>
              <td>Остальные</td>
              <td>Дата</td>
              <td></td>
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
                    .format(purchase.discount)
                    .replace(/,/g, " ")}
                </td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format(purchase.price)
                    .replace(/,/g, " ")}
                </td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format(purchase.debt)
                    .replace(/,/g, " ")}
                </td>
                <td>{purchase.shortage}</td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format(purchase.remainingAmount)
                    .replace(/,/g, " ")}
                </td>
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
        {purchases.length < 1 && (
          <div className={styles.empty}>Этот раздел пуст.</div>
        )}
      </div>
    </div>
  );
}
