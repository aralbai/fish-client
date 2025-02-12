"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Custumers() {
  const [custumers, setCustumers] = useState([]);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/custumers/${id}`)
      .then((res) => {
        setCustumers(custumers.filter((custumer) => custumer._id !== id));
        toast.success(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  useEffect(() => {
    const fetchcustumers = async () => {
      await axios
        .get("http://localhost:5000/api/custumers")
        .then((res) => {
          setCustumers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchcustumers();
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

        <table>
          <thead>
            <tr>
              <td>Имя клиента</td>
              <td>Номер телефона</td>
              <td>Адрес</td>
              <td>Лимит</td>
              <td>Движение</td>
            </tr>
          </thead>
          <tbody>
            {custumers.map((custumer) => (
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
                      query: {
                        id: custumer._id,
                        fullname: custumer.fullname,
                        phone: custumer.phone,
                        address: custumer.address,
                      },
                    }}
                  >
                    <Edit />
                  </Link>

                  <button onClick={() => handleDelete(custumer._id)}>
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
