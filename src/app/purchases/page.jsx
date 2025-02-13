"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { handleDelete } from "@/utils/handleDelete";
import { format } from "date-fns";

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchData("/purchases", setPurchases);
    fetchData("/products", setProducts);
    fetchData("/suppliers", setSuppliers);
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
              <td>Название продукта</td>
              <td>Поставщик</td>
              <td>Номер автомобиля</td>
              <td>Количество</td>
              <td>Цена</td>
              <td>Дата добавления</td>
              <td>Действие</td>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase._id}>
                <td>
                  {products?.map(
                    (product) =>
                      product._id === purchase.productId && product.title
                  )}
                </td>
                <td>
                  {suppliers?.map(
                    (supplier) =>
                      supplier._id === purchase.supplierId && supplier.title
                  )}
                </td>
                <td>{purchase.amount}</td>
                <td>{purchase.price}</td>
                <td>{purchase.carNumber}</td>
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
