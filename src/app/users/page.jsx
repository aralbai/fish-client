"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import TableTop from "@/components/tableTop/TableTop";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteModal from "@/components/deleteModal/DeleteModal";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const tableRef = useRef(null);

  useEffect(() => {
    fetchData("/users", setUsers);
  }, [deleteModalOpen]);

  const handleDeleteClick = (id) => {
    setUserId(id);

    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
      .then((res) => {
        toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log(err);
      });

    setDeleteModalOpen(false);
  };

  return (
    <div className={styles.users}>
      <h1>Аккаунтлар</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Аккаунтлар</h1>

          <Link href="/users/add-user">
            <Add />
            <p>Тазасын киритиў</p>
          </Link>
        </div>

        <TableTop tableRef={tableRef} />

        <div className={styles.tableContainer}>
          <table ref={tableRef}>
            <thead>
              <tr>
                <td>Полное имя</td>
                <td>Имя пользователя</td>
                <td>Роль</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td>{user.fullname}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td className={styles.action}>
                    <Link
                      href={{
                        pathname: "/users/edit-user",
                        query: { userId: user._id },
                      }}
                    >
                      <Edit />
                    </Link>

                    <button onClick={() => handleDeleteClick(user._id)}>
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length < 1 && (
          <div className={styles.empty}>Этот раздел пуст.</div>
        )}
      </div>

      <DeleteModal
        isModalOpen={deleteModalOpen}
        setIsModalOpen={setDeleteModalOpen}
        handleDelete={handleDelete}
      />
    </div>
  );
}
