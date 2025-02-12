"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";

export default function Sells() {
  const [sells, setSells] = useState([]);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/sells/${id}`)
      .then((res) => {
        setSells(sells.filter((supplier) => supplier._id !== id));
        toast.success(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  useEffect(() => {
    const fetchsells = async () => {
      await axios
        .get("http://localhost:5000/api/sells")
        .then((res) => {
          setSells(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchsells();
  }, []);

  return (
    <div className={styles.products}>
      <h1>Поставщики</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все поставщики</h1>
          <Link href="/sells/add-supplier">
            <Add />
            Создать новый
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <td>Название поставщика</td>
              <td>Номер телефона</td>
              <td>Адрес</td>
              <td>Кто добавил</td>
              <td>Кто изменился последним</td>
              <td>Дата создания</td>
              <td>Дата изменения</td>
              <td>Движение</td>
            </tr>
          </thead>
          <tbody>
            {sells.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.title}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.address}</td>
                <td>admin</td>
                <td>admin</td>
                <td>
                  {format(
                    new Date(supplier.createdAt),
                    "dd.MM.yyyy / HH:mm:ss"
                  )}
                </td>
                <td>
                  {format(
                    new Date(supplier.updatedAt),
                    "dd.MM.yyyy / HH:mm:ss"
                  )}
                </td>
                <td className={styles.action}>
                  <Link
                    href={{
                      pathname: "/sells/edit-supplier",
                      query: {
                        id: supplier._id,
                        title: supplier.title,
                        phone: supplier.phone,
                        address: supplier.address,
                      },
                    }}
                  >
                    <Edit />
                  </Link>

                  <button onClick={() => handleDelete(supplier._id)}>
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
