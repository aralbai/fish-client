"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/purchases/${id}`)
      .then((res) => {
        setPurchases(purchases.filter((purchase) => purchase._id !== id));
        toast.success(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  useEffect(() => {
    const fetchpurchases = async () => {
      await axios
        .get("http://localhost:5000/api/purchases")
        .then((res) => {
          setPurchases(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchpurchases();
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

        <table>
          <thead>
            <tr>
              <td>Название продукта</td>
              <td>Поставщик</td>
              <td>Номер автомобиля</td>
              <td>Количество</td>
              <td>Цена</td>
              <td>Действие</td>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase._id}>
                <td>{purchase.title}</td>
                <td>{purchase.phone}</td>
                <td>{purchase.address}</td>
                <td className={styles.action}>
                  <Link
                    href={{
                      pathname: "/purchases/edit-purchase",
                      query: { purchase: purchase },
                    }}
                  >
                    <Edit />
                  </Link>

                  <button onClick={() => handleDelete(purchase._id)}>
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
