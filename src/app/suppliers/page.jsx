"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { handleDelete } from "@/utils/handleDelete";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchData("/suppliers", setSuppliers);
  }, []);

  return (
    <div className={styles.products}>
      <h1>Поставщики</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все поставщики</h1>
          <Link href="/suppliers/add-supplier">
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
              <td> Действие</td>
            </tr>
          </thead>
          <tbody>
            {suppliers?.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.title}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.address}</td>
                <td className={styles.action}>
                  <Link
                    href={{
                      pathname: "/suppliers/edit-supplier",
                      query: { supplierId: supplier._id },
                    }}
                  >
                    <Edit />
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        "/suppliers",
                        supplier._id,
                        suppliers,
                        setSuppliers
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
