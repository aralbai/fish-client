"use client";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import { fetchData } from "@/utils/fetchData";
import { format } from "date-fns";
import Link from "next/link";
import {
  AccountBalanceWallet,
  Delete,
  Edit,
  KeyboardBackspace,
} from "@mui/icons-material";
import RepayModal from "@/components/repayModal/RepayModal";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import DeleteModal from "@/components/deleteModal/DeleteModal";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

export default function SingleSell() {
  const { user } = useContext(AuthContext);
  const [sell, setSell] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRepay, setDeleteRepay] = useState(false);
  const [users, setUsers] = useState([]);
  const [repays, setRepays] = useState([]);

  const searchParams = useSearchParams();
  const sellId = searchParams.get("sellId");
  const router = useRouter();

  const tableRef = useRef();

  useEffect(() => {
    fetchData(`/sells/${sellId}`, setSell);
    fetchData(`/users/all`, setUsers);
    fetchData(`/repays/${sellId}`, setRepays);
  }, [isModalOpen, deleteRepay]);

  const handleRepayDelete = async (e, repayId) => {
    e.preventDefault();

    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/repays/${sellId}/${repayId}`)
      .then((res) => {
        toast.success(res.data);

        setDeleteRepay(!deleteRepay);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);

        console.log(err);
      });
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleSellDelete = async (e, repayId) => {
    e.preventDefault();

    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/sells/${sellId}`)
      .then((res) => {
        toast.success(res.data);

        router.push("/sells");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log(err);
      });

    setDeleteModalOpen(false);
  };

  return (
    <ProtectedRoute>
      <div className={styles.singleSell}>
        <div className={styles.title}>
          <h1>Единая продажа</h1>

          <Link href="/sells">
            <KeyboardBackspace />
            <p>Артқа қайтыў</p>
          </Link>
        </div>

        <div className={styles.sellInfo}>
          <div className={styles.left}>
            <div className={styles.top}>
              <h2>Информация о продажа</h2>

              <div>
                <Link
                  href={{
                    pathname: "/sells/edit-sell",
                    query: {
                      sellId: sell._id,
                      purchaseId: sell.purchaseId,
                    },
                  }}
                >
                  <Edit />
                </Link>

                <button onClick={handleDeleteClick}>
                  <Delete />
                </button>

                {sell?.debt > 0 && (
                  <button onClick={() => setIsModalOpen(true)}>
                    <AccountBalanceWallet />
                  </button>
                )}
              </div>
            </div>
            <ul>
              <li>
                <p>Продукт</p>
                <p>{sell?.product?.title}</p>
              </li>
              <li>
                <p>Клиент</p>
                <p>{sell?.custumer?.fullname}</p>
              </li>
              <li>
                <p>Муғдары</p>
                <p>
                  {sell.amount
                    ? Intl.NumberFormat("uz-UZ")
                        .format(sell.amount / 1000)
                        .replace(/,/g, " ")
                    : 0}
                </p>
              </li>

              <li>
                <p>Баҳасы</p>
                <p>
                  {sell?.price
                    ? Intl.NumberFormat("ru-RU")
                        .format(sell.price)
                        .replace(/,/g, " ")
                    : 0}
                </p>
              </li>
              <li>
                <p>Сумма</p>
                <p>
                  {sell?.price
                    ? Intl.NumberFormat("ru-RU")
                        .format(sell.totalPrice)
                        .replace(/,/g, " ")
                    : 0}
                </p>
              </li>
              <li>
                <p>Скидка</p>
                <p>
                  {sell?.discount
                    ? Intl.NumberFormat("ru-RU")
                        .format(sell.discount)
                        .replace(/,/g, " ")
                    : 0}
                </p>
              </li>
              <li>
                <p>Қарыз</p>
                <p>
                  {sell?.debt
                    ? Intl.NumberFormat("ru-RU")
                        .format(sell.debt)
                        .replace(/,/g, " ")
                    : 0}
                </p>
              </li>
              <li>
                <p>Төленди</p>
                <p>
                  {sell?.given
                    ? Intl.NumberFormat("ru-RU")
                        .format(sell.given)
                        .replace(/,/g, " ")
                    : 0}
                </p>
              </li>
            </ul>
          </div>

          <div className={styles.right}>
            <div className={styles.top}>
              <h2>Киритиў ҳәм өзгертиў</h2>
            </div>

            <ul>
              <li>
                <p>Киритилген сәне</p>
                <p>
                  {sell?.createdAt &&
                    format(new Date(sell?.createdAt), "dd.MM.yyyy HH:mm")}
                </p>
              </li>
              <li>
                <p>Ақырғы өзгерткен сәне</p>
                <p>
                  {sell?.updatedAt &&
                    format(new Date(sell?.updatedAt), "dd.MM.yyyy HH:mm")}
                </p>
              </li>

              {user?.role === "superadmin" && (
                <li>
                  <p>Кириткен аккаунт</p>
                  <p>
                    {users?.map(
                      (user) =>
                        user._id === sell?.addedUserId && (
                          <Link
                            href="/users"
                            key={user._id}
                            style={{ color: "#1976D2" }}
                          >
                            {user?.username}
                          </Link>
                        )
                    )}
                  </p>
                </li>
              )}

              {user?.role === "superadmin" && (
                <li>
                  <p>Ақырғы өзгерткен аккаунт</p>
                  <p>
                    {users?.map(
                      (user) =>
                        user?._id === sell?.changedUserId && (
                          <Link
                            href="/users"
                            key={user?._id}
                            style={{ color: "#1976D2" }}
                          >
                            {user?.username}
                          </Link>
                        )
                    )}
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className={styles.repays}>
          <h2>Погашение Қарыза</h2>

          <div className={styles.tableContainer}>
            <table ref={tableRef}>
              <thead>
                <tr>
                  <td>Сумма</td>
                  <td>Сәне</td>
                  <td>Кто принял</td>
                  <td>Кто изменился</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {repays?.length > 0 &&
                  repays?.map((repay) => (
                    <tr key={repay._id}>
                      <td>
                        {(repay.amount &&
                          Intl.NumberFormat("ru-RU")
                            .format(repay.amount)
                            .replace(/,/g, " ")) ||
                          0}
                      </td>
                      <td>
                        {repay?.addedDate &&
                          format(
                            new Date(repay?.addedDate),
                            "dd.MM.yyyy HH:mm"
                          )}
                      </td>
                      <td>
                        {users?.map(
                          (user) =>
                            user._id === repay?.addedUserId && (
                              <Link
                                href="/users"
                                key={user._id}
                                style={{ color: "#1976D2" }}
                              >
                                {user?.username}
                              </Link>
                            )
                        )}
                      </td>
                      <td>
                        {users?.map(
                          (user) =>
                            user._id === repay?.changedUserId && (
                              <Link
                                href="/users"
                                key={user._id}
                                style={{ color: "#1976D2" }}
                              >
                                {user?.username}
                              </Link>
                            )
                        )}
                      </td>
                      <td className={styles.action}>
                        <Link
                          href={{
                            pathname: "/repays/edit-supplier",
                            query: {
                              repayId: repay._id,
                            },
                          }}
                        >
                          <Edit />
                        </Link>

                        <button
                          onClick={(e) => handleRepayDelete(e, repay._id)}
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

        {sell?.repays?.length < 1 && (
          <div className={styles.empty}>Этот раздел пуст.</div>
        )}

        <RepayModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          sellId={sellId}
          max={sell?.debt}
        />

        <DeleteModal
          isModalOpen={deleteModalOpen}
          setIsModalOpen={setDeleteModalOpen}
          handleDelete={handleSellDelete}
        />
      </div>
    </ProtectedRoute>
  );
}
