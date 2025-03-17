"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit, FormatColorReset } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { handleDelete } from "@/utils/handleDelete";
import TableTop from "@/components/tableTop/TableTop";

export default function Users() {
  const [users, setUsers] = useState([]);

  const tableRef = useRef(null);

  useEffect(() => {
    fetchData("/users", setUsers);
  }, []);

  return (
    <div className={styles.users}>
      <h1>Пользователи</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все пользователи</h1>
          <Link href="/users/add-user">
            <Add />
            Создать новый
          </Link>
        </div>

        <TableTop tableRef={tableRef} />

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

                  <button
                    onClick={() =>
                      handleDelete("/users", user._id, users, setUsers)
                    }
                  >
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length < 1 && (
          <div className={styles.empty}>Этот раздел пуст.</div>
        )}
      </div>
    </div>
  );
}
