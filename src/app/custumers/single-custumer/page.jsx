"use client";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import { fetchData } from "@/utils/fetchData";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import {
  ArrowRightAlt,
  Delete,
  Edit,
  FormatColorReset,
  KeyboardBackspace,
} from "@mui/icons-material";
import RepayModal from "@/components/repayModal/RepayModal";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import LimitModal from "@/components/limitModal/LimitModal";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

export default function SingleCustumer() {
  const { user } = useContext(AuthContext);
  const [custumer, setCustumer] = useState({});
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [limitModal, setLimitModal] = useState(false);
  const [custumerDebts, setCustumedebts] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const custumerId = searchParams.get("custumerId");

  const tableRef = useRef();

  let totalCustumerDebt = 0;
  custumerDebts?.forEach((sell) => {
    totalCustumerDebt += sell?.debt;
  });

  useEffect(() => {
    fetchData(`/custumers/${custumerId}`, setCustumer);
    fetchData(`/users/all`, setUsers);
    fetchData(`/sells/single/debts/${custumerId}`, setCustumedebts);
  }, [isModalOpen, limitModal]);

  const handleDelete = async (e) => {
    e.preventDefault();

    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/custumers/${custumerId}`)
      .then((res) => {
        toast.success(res.data);
        router.push("/custumers");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);

        console.log(err);
      });
  };

  return (
    <ProtectedRoute>
      <div className={styles.singleCustumer}>
        <div className={styles.title}>
          <h1>Единый клиент</h1>

          <Link href="/custumers">
            <KeyboardBackspace />
            <p>Артқа қайтыў</p>
          </Link>
        </div>

        <div className={styles.custumerInfo}>
          <div className={styles.left}>
            <div className={styles.top}>
              <h2>Информация о клиенте</h2>

              <div>
                <Link
                  href={{
                    pathname: "/custumers/edit-custumer",
                    query: {
                      custumerId: custumer._id,
                    },
                  }}
                >
                  <Edit />
                </Link>
                <button onClick={handleDelete}>
                  <Delete />
                </button>
                <button
                  onClick={() => {
                    setLimitModal(true);
                  }}
                >
                  <FormatColorReset />
                </button>
              </div>
            </div>

            <ul>
              <li>
                <p>Имя клиента</p>
                <p>{custumer?.fullname}</p>
              </li>
              <li>
                <p>Номер телефона</p>
                <p>{custumer?.phone}</p>
              </li>
              <li>
                <p>Адрес</p>
                <p>{custumer?.address}</p>
              </li>
              <li>
                <p>Қарызлар</p>
                <p>{Intl.NumberFormat("ru-RU").format(totalCustumerDebt)}</p>
              </li>
              <li>
                <p>Лимит</p>
                <p>
                  {custumer.limit === -1
                    ? "Безлимитный"
                    : Intl.NumberFormat("ru-RU").format(custumer.limit)}
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
                  {custumer?.createdAt &&
                    format(
                      new Date(custumer?.createdAt),
                      "dd.MM.yyyy hh:mm:ss"
                    )}
                </p>
              </li>
              <li>
                <p>Ақырғы өзгерткен сәне</p>
                <p>
                  {custumer?.updatedAt &&
                    format(
                      new Date(custumer?.updatedAt),
                      "dd.MM.yyyy hh:mm:ss"
                    )}
                </p>
              </li>

              {user?.role === "superadmin" && (
                <li>
                  <p>Кириткен аккаунт</p>
                  <p>
                    {users?.map(
                      (user) =>
                        user._id === custumer.addedUserId && (
                          <Link
                            href="/users"
                            key={user._id}
                            style={{ color: "#1976D2" }}
                          >
                            {user.username}
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
                        user?._id === custumer?.changedUserId && (
                          <Link
                            href="/users"
                            key={user._id}
                            style={{ color: "#1976D2" }}
                          >
                            {user.username}
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
          <h2>Список Қарызов</h2>

          <div className={styles.tableContainer}>
            <table ref={tableRef}>
              <thead>
                <tr>
                  <td>Продукт</td>
                  <td>Муғдары</td>
                  <td>Debt</td>
                  <td>Сәне</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {custumerDebts.length > 0 &&
                  custumerDebts.map((sell) => (
                    <tr key={sell._id}>
                      <td>{sell.product?.title}</td>
                      <td>{sell.amount}</td>
                      <td>{Intl.NumberFormat("ru-RU").format(sell.debt)}</td>
                      <td>
                        {format(new Date(sell.addedDate), "dd.MM.yyyy HH:mm")}
                      </td>
                      <td className={styles.action}>
                        <Link
                          href={{
                            pathname: "/sells/single-sell",
                            query: {
                              sellId: sell._id,
                            },
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

          {custumerDebts.length < 1 && (
            <div className={styles.empty}>Этот раздел пуст.</div>
          )}
        </div>

        <RepayModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          custumerId={custumerId}
        />

        <LimitModal
          isModalOpen={limitModal}
          setIsModalOpen={setLimitModal}
          custumerId={custumerId}
        />
      </div>
    </ProtectedRoute>
  );
}
