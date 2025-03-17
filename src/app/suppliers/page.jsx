"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import TableTop from "@/components/tableTop/TableTop";
import { format } from "date-fns";
import DeleteModal from "@/components/deleteModal/DeleteModal";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";

export default function Suppliers() {
  const { user } = useContext(AuthContext);
  const [suppliers, setSuppliers] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData("/suppliers", setSuppliers);

    fetchData("/users/all", setUsers);
  }, [isModalOpen]);

  const handleDeleteClick = (id) => {
    setSupplierId(id);
    setIsModalOpen(true);
  };

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
              <td>Название поставщика</td>
              <td>Номер телефона</td>
              <td>Адрес</td>
              <td>Добавлен</td>
              <td>Последнее изменение</td>
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
                  {user?.role === "superadmin"
                    ? users?.map((user) =>
                        user._id === supplier.addedUserId ? (
                          <Link
                            href="/users"
                            key={user._id}
                            style={{ color: "#1976D2" }}
                          >
                            {user.username} {" - "}
                          </Link>
                        ) : null
                      )
                    : ""}
                  {format(new Date(supplier.createdAt), "dd.MM.yyyy HH:mm:ss")}
                </td>
                <td>
                  {user?.role === "superadmin"
                    ? users?.map((user) =>
                        user._id === supplier.changedUserId ? (
                          <Link
                            href="/users"
                            key={user._id}
                            style={{ color: "#1976D2" }}
                          >
                            {user.username} {" - "}
                          </Link>
                        ) : null
                      )
                    : ""}
                  {format(new Date(supplier.updatedAt), "dd.MM.yyyy HH:mm:ss")}
                </td>
                <td className={styles.action}>
                  <Link
                    href={{
                      pathname: "/suppliers/edit-supplier",
                      query: { supplierId: supplier._id },
                    }}
                  >
                    <Edit />
                  </Link>

                  <button onClick={() => handleDeleteClick(supplier._id)}>
                    <Delete />
                  </button>
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
