"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, ArrowRightAlt } from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import TableTop from "@/components/tableTop/TableTop";
import DeleteModal from "@/components/deleteModal/DeleteModal";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";

export default function Suppliers() {
  const { user } = useContext(AuthContext);
  const [suppliers, setSuppliers] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData("/suppliers", setSuppliers);
    fetchData("/purchases", setPurchases);

    fetchData("/users/all", setUsers);
  }, [isModalOpen]);

  const handleDelete = async () => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/suppliers/${supplierId}`)
      .then((res) => {
        toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });

    setIsModalOpen(false);
  };

  const debtMap = purchases.reduce((acc, purchase) => {
    acc[purchase?.supplier?.id] =
      (acc[purchase?.supplier?.id] || 0) + purchase?.debt;
    return acc;
  }, {});

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

        <TableTop tableRef={tableRef} />

        <table ref={tableRef}>
          <thead>
            <tr>
              <td>Поставщик</td>
              <td>Номер телефона</td>
              <td>Адрес</td>
              <td>Наши долги</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {suppliers?.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.title}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.address}</td>
                <td>
                  {(debtMap[supplier?._id] &&
                    Intl.NumberFormat("ru-RU").format(
                      debtMap[supplier?._id]
                    )) ||
                    0}
                </td>
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
        {suppliers.length < 1 && (
          <div className={styles.empty}>Этот раздел пуст.</div>
        )}
      </div>

      <DeleteModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleDelete={handleDelete}
      />
    </div>
  );
}
