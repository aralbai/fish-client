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
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import ShortageModal from "@/components/shortageModal/ShortageModal";
import DeleteModal from "@/components/deleteModal/DeleteModal";

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
      });

    setDeleteModalOpen(false);
  };

  return (
    <div className={styles.singlePurchase}>
      <div className={styles.title}>
        <h1>Разовая покупка</h1>

        <PrimaryBtn
          type="link"
          fullname="Вернуться к списку"
          url="/purchases"
          icon={<KeyboardBackspace />}
        >
          <KeyboardBackspace />
          Вернуться к списку
        </PrimaryBtn>
      </div>

      <div className={styles.purchaseInfo}>
        <div className={styles.left}>
          <div className={styles.top}>
            <h2>Информация о покупке</h2>

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
              {purchaseSells.length <= 0 && (
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
              <p>Продукта</p>
              <p>{purchase?.product?.title}</p>
            </li>
            <li>
              <p>Поставщик</p>
              <p>{purchase?.supplier?.title}</p>
            </li>
            <li>
              <p>Номер автомобиля</p>
              <p>{purchase?.carNumber}</p>
            </li>
            <li>
              <p>Количество</p>
              <p>{purchase?.amount}</p>
            </li>
            <li>
              <p>Цена за килограмм</p>
              <p>{Intl.NumberFormat("ru-RU").format(purchase?.price)}</p>
            </li>
            <li>
              <p>Цена</p>
              <p>{Intl.NumberFormat("ru-RU").format(purchase?.totalPrice)}</p>
            </li>
            <li>
              <p>Скидка</p>
              <p>{Intl.NumberFormat("ru-RU").format(purchase?.discount)}</p>
            </li>
            <li>
              <p>Долг</p>
              <p>{Intl.NumberFormat("ru-RU").format(purchase?.debt)}</p>
            </li>
            <li>
              <p>Оплачено</p>
              <p>{Intl.NumberFormat("ru-RU").format(purchase?.given)}</p>
            </li>
            <li>
              <p>Остальные</p>
              <p>
                {Intl.NumberFormat("ru-RU").format(purchase?.remainingAmount)}
              </p>
            </li>
            <li>
              <p>Недостаток</p>
              <p>{Intl.NumberFormat("ru-RU").format(purchase?.shortage)}</p>
            </li>
          </ul>
        </div>

        <div className={styles.right}>
          <div className={styles.top}>
            <h2>Добавление и изменение</h2>
          </div>

          <ul>
            <li>
              <p>Дата добавления</p>
              <p>
                {purchase?.createdAt &&
                  format(new Date(purchase?.createdAt), "dd.MM.yyyy HH:mm")}
              </p>
            </li>
            <li>
              <p>Дата изменения</p>
              <p>
                {purchase?.updatedAt &&
                  format(new Date(purchase?.updatedAt), "dd.MM.yyyy HH:mm")}
              </p>
            </li>

            {user?.role === "superadmin" && (
              <li>
                <p>Кто добавил</p>
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
                <p>Кто изменился последним</p>
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
        <h2>Список продаж</h2>

        <table ref={tableRef}>
          <thead>
            <tr>
              <td>Продукта</td>
              <td>Клиент</td>
              <td>Amount</td>
              <td>Цена</td>
              <td>Дата</td>
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
                  <td>{Intl.NumberFormat("ru-RU").format(sell?.price)}</td>
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
  );
}
