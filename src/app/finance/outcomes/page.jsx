"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteModal from "@/components/deleteModal/DeleteModal";
import { AuthContext } from "@/context/AuthContext";
import TableTop from "@/components/tableTop/TableTop";

export default function Outcomes() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [outcomes, setOutcomes] = useState([]);
  const [outcomesTotalPrice, setOutcomesTotalPrice] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [outcomeId, setOutcomeId] = useState("");

  const tableRef = useRef();

  useEffect(() => {
    fetchData("/outcomes", setOutcomes);
    fetchData("/users/all", setUsers);
    fetchData("/outcomes/total", setOutcomesTotalPrice);
  }, [deleteModalOpen]);

  const handleDeleteClick = (id) => {
    setOutcomeId(id);

    setDeleteModalOpen(true);
  };

  const handleDelete = async (e) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/outcomes/${outcomeId}`)
      .then((res) => {
        toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });

    setDeleteModalOpen(false);
  };

  return (
    <div className={styles.outcomes}>
      <h1>Расходы</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все расходы</h1>
          <Link href="/finance/outcomes/add-outcome">
            <Add />
            Создать новый
          </Link>
        </div>

        <TableTop tableRef={tableRef} />

        <table ref={tableRef}>
          <thead>
            <tr style={{ backgroundColor: "#4E5CA0", color: "#fff" }}>
              <td>
                {Intl.NumberFormat("ru-RU").format(
                  outcomesTotalPrice.totalOutcomes
                )}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td style={{ padding: "30px" }}></td>
            </tr>
            <tr>
              <td>Сумма</td>
              <td>Куда</td>
              <td>Дата</td>
              <td>Добавление</td>
              <td>Последнее изменение</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {outcomes?.map((outcome) => (
              <tr key={outcome._id}>
                <td>{Intl.NumberFormat("ru-RU").format(outcome.amount)}</td>
                <td>{outcome.purpose}</td>
                <td>{format(outcome.addedDate, "dd.MM.yyyy HH:mm")}</td>
                <td>
                  {user?.role === "superadmin"
                    ? users?.map((user) =>
                        user._id === outcome?.addedUserId ? (
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
                  {format(new Date(outcome?.createdAt), "dd.MM.yyyy HH:mm")}
                </td>
                <td>
                  {user?.role === "superadmin"
                    ? users?.map((user) =>
                        user._id === outcome?.changedUserId ? (
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
                  {format(new Date(outcome?.updatedAt), "dd.MM.yyyy HH:mm")}
                </td>
                <td className={styles.action}>
                  <Link
                    href={{
                      pathname: "/finance/outcomes/edit-outcome",
                      query: { outcomeId: outcome._id },
                    }}
                  >
                    <Edit />
                  </Link>

                  <button onClick={() => handleDeleteClick(outcome._id)}>
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteModal
        isModalOpen={deleteModalOpen}
        setIsModalOpen={setDeleteModalOpen}
        handleDelete={handleDelete}
      />
    </div>
  );
}
