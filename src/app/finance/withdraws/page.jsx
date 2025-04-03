"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { format } from "date-fns";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import DeleteModal from "@/components/deleteModal/DeleteModal";
import axios from "axios";
import TableTop from "@/components/tableTop/TableTop";

export default function Withdraws() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [withdraws, setWithdraws] = useState([]);
  const [withdrawId, setWithdrawId] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData("/withdraws", setWithdraws);
    fetchData("/users/all", setUsers);
  }, [deleteModalOpen]);

  let total = 0;
  withdraws.forEach((withdraw) => {
    total += withdraw.amount;
  });

  const handleDeleteClick = (id) => {
    setWithdrawId(id);

    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/withdraws/${withdrawId}`)
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
    <div className={styles.withdraws}>
      <h1>Снятия</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все снятия</h1>
          <Link href="/finance/withdraws/add-withdraw">
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
                <td>Кому</td>
                <td>Сәне</td>
                <td>Киритилди</td>
                <td>Последнее Өзгертирилди</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {withdraws?.map((withdraw) => (
                <tr key={withdraw._id}>
                  <td>{Intl.NumberFormat("ru-RU").format(withdraw.amount)}</td>
                  <td>{withdraw.toWhom}</td>
                  <td>{format(withdraw.addedDate, "dd.MM.yyyy HH:mm")}</td>
                  <td>
                    {user?.role === "superadmin"
                      ? users?.map((user) =>
                          user._id === withdraw?.addedUserId ? (
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
                    {format(new Date(withdraw?.createdAt), "dd.MM.yyyy HH:mm")}
                  </td>
                  <td>
                    {user?.role === "superadmin"
                      ? users?.map((user) =>
                          user._id === withdraw?.changedUserId ? (
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
                    {format(new Date(withdraw?.updatedAt), "dd.MM.yyyy HH:mm")}
                  </td>
                  <td className={styles.action}>
                    <Link
                      href={{
                        pathname: "/finance/withdraws/edit-withdraw",
                        query: { withdrawId: withdraw._id },
                      }}
                    >
                      <Edit />
                    </Link>

                    <button onClick={() => handleDeleteClick(withdraw._id)}>
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {withdraws?.length < 1 && (
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
