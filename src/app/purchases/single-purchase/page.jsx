"use client";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import { fetchData } from "@/utils/fetchData";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import {
  ArrowRightAlt,
  BedtimeOff,
  Delete,
  Edit,
  KeyboardBackspace,
} from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import ShortageModal from "@/components/shortageModal/ShortageModal";
import DeleteModal from "@/components/deleteModal/DeleteModal";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

export default function SinglePurchase() {
  const { user } = useContext(AuthContext);
  const [purchase, setPurchase] = useState({});
  const [users, setUsers] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [shortageModalOpen, setShortageModalOpen] = useState(false);
  const [purchaseSells, setPurchaseSells] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const purchaseId = searchParams.get("purchaseId");

  const tableRef = useRef();

  useEffect(() => {
    fetchData(`/purchases/${purchaseId}`, setPurchase);
    fetchData(`/users/all`, setUsers);
    fetchData(`/sells/single/purchase/${purchaseId}`, setPurchaseSells);
  }, [deleteModalOpen, shortageModalOpen]);

  const handleDeleteClick = (id) => {
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/purchases/${purchaseId}`)
      .then((res) => {
        toast.success(res.data);

        router.push("/purchases");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);

        console.log(err);
      });

    setDeleteModalOpen(false);
  };

  return (
    <ProtectedRoute>
      <div className={styles.singlePurchase}>
        <div className={styles.title}>
          <h1>Сатып алыў</h1>

          <Link href="/purchases">
            <KeyboardBackspace />
            <p></p>
          </Link>
        </div>

        <div className={styles.purchaseInfo}>
          <div className={styles.left}>
            <div className={styles.top}>
              <h2>Информация</h2>

              <div>
                <Link
                  href={{
                    pathname: "/purchases/edit-purchase",
                    query: {
                      purchaseId: purchaseId,
                    },
                  }}
                >
                  <Edit />
                </Link>
                {purchaseSells?.length <= 0 && (
                  <button onClick={handleDeleteClick}>
                    <Delete />
                  </button>
                )}
                <button
                  onClick={() => {
                    setShortageModalOpen(true);
                  }}
                >
                  <BedtimeOff />
                </button>
              </div>
            </div>

            <ul>
              <li>
                <p>Продукт</p>
                <p>{purchase?.product?.title}</p>
              </li>
              <li>
                <p>Сатыўшы</p>
                <p>{purchase?.supplier?.title}</p>
              </li>
              <li>
                <p>Машина номери</p>
                <p>{purchase?.carNumber}</p>
              </li>
              <li>
                <p>Муғдары</p>
                <p>
                  {purchase?.amount
                    ? Intl.NumberFormat("uz-UZ").format(purchase?.amount / 1000)
                    : 0}
                </p>
              </li>
              <li>
                <p>Баҳасы</p>
                <p>
                  {purchase?.price
                    ? Intl.NumberFormat("ru-RU").format(purchase?.price)
                    : 0}
                </p>
              </li>
              <li>
                <p>Сумма</p>
                <p>
                  {purchase?.totalPrice
                    ? Intl.NumberFormat("ru-RU").format(purchase?.totalPrice)
                    : 0}
                </p>
              </li>
              <li>
                <p>Скидка</p>
                <p>
                  {purchase?.discount
                    ? Intl.NumberFormat("ru-RU").format(purchase?.discount)
                    : 0}
                </p>
              </li>
              <li>
                <p>Қалдық</p>
                <p>
                  {purchase?.remainingAmount
                    ? Intl.NumberFormat("uz-UZ").format(
                        purchase?.remainingAmount / 1000
                      )
                    : 0}
                </p>
              </li>
              <li>
                <p>Сатылды</p>
                <p>
                  {Intl.NumberFormat("ru-RU").format(
                    purchase?.amount -
                      purchase?.remainingAmount -
                      purchase?.shortage
                  )}
                </p>
              </li>
              <li>
                <p>Кемшилик</p>
                <p>{Intl.NumberFormat("ru-RU").format(purchase?.shortage)}</p>
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
                  {purchase?.createdAt &&
                    format(new Date(purchase?.createdAt), "dd.MM.yyyy HH:mm")}
                </p>
              </li>
              <li>
                <p>Ақырғы өзгерткен сәне</p>
                <p>
                  {purchase?.updatedAt &&
                    format(new Date(purchase?.updatedAt), "dd.MM.yyyy HH:mm")}
                </p>
              </li>

              {user?.role === "superadmin" && (
                <li>
                  <p>Кириткен аккаунт</p>
                  <p>
                    {users?.map(
                      (user) =>
                        user._id === purchase?.addedUserId && (
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
                        user?._id === purchase?.changedUserId && (
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
          <h2>Сатыўлар</h2>

          <div className={styles.tableContainer}>
            <table ref={tableRef}>
              <thead>
                <tr>
                  <td>Продукт</td>
                  <td>Клиент</td>
                  <td>Муғдары</td>
                  <td>Сумма</td>
                  <td>Сәне</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {purchaseSells.length > 0 &&
                  purchaseSells.map((sell) => (
                    <tr key={sell?._id}>
                      <td>{sell?.product?.title}</td>
                      <td>{sell?.custumer?.fullname}</td>
                      <td>{sell?.amount}</td>
                      <td>
                        {Intl.NumberFormat("ru-RU").format(sell?.totalPrice)}
                      </td>
                      <td>
                        {format(new Date(sell?.addedDate), "dd.MM.yyyy HH:mm")}
                      </td>
                      <td className={styles.action}>
                        <Link
                          href={{
                            pathname: "/sells/single-sell",
                            query: {
                              sellId: sell?._id,
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

          {purchaseSells.length < 1 && (
            <div className={styles.empty}>Этот раздел пуст.</div>
          )}
        </div>

        <ShortageModal
          isModalOpen={shortageModalOpen}
          setIsModalOpen={setShortageModalOpen}
          purchaseId={purchaseId}
        />

        <DeleteModal
          isModalOpen={deleteModalOpen}
          setIsModalOpen={setDeleteModalOpen}
          handleDelete={handleDelete}
        />
      </div>
    </ProtectedRoute>
  );
}
