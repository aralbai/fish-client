"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { format } from "date-fns";
import TableTop from "@/components/tableTop/TableTop";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import DeleteModal from "@/components/deleteModal/DeleteModal";
import axios from "axios";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

export default function Deposits() {
  const { user } = useContext(AuthContext);
  const [deposites, setDeposites] = useState([]);
  const [depositId, setDepositId] = useState("");
  const [users, setUsers] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const tableRef = useRef();

  useEffect(() => {
    fetchData("/deposits", setDeposites);
    fetchData("/users/all", setUsers);
  }, [deleteModalOpen]);

  let total = 0;
  deposites.forEach((deposit) => {
    total += deposit.amount;
  });

  const handleDeleteClick = (id) => {
    setDepositId(id);

    setDeleteModalOpen(true);
  };

  const handleDelete = async (e) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/deposits/${depositId}`)
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
    <ProtectedRoute>
      <div className={styles.deposites}>
        <h1>Депозиты</h1>

        <div className={styles.table}>
          <div className={styles.top}>
            <h1>Все депозиты</h1>
            <Link href="/finance/deposits/add-deposit">
              <Add />
              <p>Тазасын киритиў</p>
            </Link>
          </div>

          <TableTop tableRef={tableRef} />

          <div className={styles.tableContainer}>
            <table ref={tableRef}>
              <thead>
                <tr style={{ backgroundColor: "#4E5CA0", color: "#fff" }}>
                  <td>{Intl.NumberFormat("ru-RU").format(total)}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style={{ padding: "30px" }}></td>
                </tr>
                <tr>
                  <td>Сумма</td>
                  <td>От кого</td>
                  <td>Сәне</td>
                  <td>Киритилди</td>
                  <td>Последнее Өзгертирилди</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {deposites?.map((deposit) => (
                  <tr key={deposit._id}>
                    <td>{Intl.NumberFormat("ru-RU").format(deposit.amount)}</td>
                    <td>{deposit.fromWhom}</td>
                    <td>{format(deposit.addedDate, "dd.MM.yyyy HH:mm")}</td>
                    <td>
                      {user?.role === "superadmin"
                        ? users?.map((user) =>
                            user._id === deposit?.addedUserId ? (
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
                      {format(new Date(deposit?.createdAt), "dd.MM.yyyy HH:mm")}
                    </td>
                    <td>
                      {user?.role === "superadmin"
                        ? users?.map((user) =>
                            user._id === deposit?.changedUserId ? (
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
                      {format(new Date(deposit?.updatedAt), "dd.MM.yyyy HH:mm")}
                    </td>
                    <td className={styles.action}>
                      <Link
                        href={{
                          pathname: "/finance/deposits/edit-deposit",
                          query: { depositId: deposit._id },
                        }}
                      >
                        <Edit />
                      </Link>

                      <button onClick={() => handleDeleteClick(deposit._id)}>
                        <Delete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {deposites.length < 1 && (
            <div className={styles.empty}>Этот раздел пуст.</div>
          )}
        </div>

        <DeleteModal
          isModalOpen={deleteModalOpen}
          setIsModalOpen={setDeleteModalOpen}
          handleDelete={handleDelete}
        />
      </div>
    </ProtectedRoute>
  );
}
