"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, ArrowRightAlt } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import TableTop from "@/components/tableTop/TableTop";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData("/suppliers", setSuppliers);
  }, []);

  return (
    <ProtectedRoute>
      <div className={styles.products}>
        <h1>Сатыўшыи</h1>

        <div className={styles.table}>
          <div className={styles.top}>
            <h1>Сатыўшыи</h1>
            <Link href="/suppliers/add-supplier">
              <Add />
              <p>Тазасын киритиў</p>
            </Link>
          </div>

          <TableTop tableRef={tableRef} />

          <div className={styles.tableContainer}>
            <table ref={tableRef}>
              <thead>
                <tr>
                  <td>Сатыўшы</td>
                  <td>Номер телефона</td>
                  <td>Адрес</td>
                  <td></td>
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
                          pathname: "/suppliers/single-supplier",
                          query: { supplierId: supplier._id },
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

          {suppliers.length < 1 && (
            <div className={styles.empty}>Этот раздел пуст.</div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
