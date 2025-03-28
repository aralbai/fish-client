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
  KeyboardBackspace,
} from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import DeleteModal from "@/components/deleteModal/DeleteModal";

export default function SingleSupplier() {
  const { user } = useContext(AuthContext);
  const [supplier, setSupplier] = useState({});
  const [users, setUsers] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [purchases, setPurchases] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const supplierId = searchParams.get("supplierId");

  const tableRef = useRef();

  useEffect(() => {
    fetchData(`/suppliers/${supplierId}`, setSupplier);
    fetchData(`/users/all`, setUsers);
    fetchData(`/purchases/supplier/purchases/${supplierId}`, setPurchases);
  }, [deleteModal]);

  const handleDeleteClick = (id) => {
    setDeleteModal(true);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/suppliers/${supplierId}`)
      .then((res) => {
        toast.success(res.data);
        router.push("/suppliers");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);

        console.log(err);
      });

    setDeleteModal(false);
  };

  const purchasesTotal = purchases.reduce(
    (sum, purchase) => sum + purchase.debt,
    0
  );

  return (
    <div className={styles.singleSupplier}>
      <div className={styles.title}>
        <h1>Единый клиент</h1>

        <Link href="/suppliers">
          <KeyboardBackspace />
          <p>Вернуться к списку</p>
        </Link>
      </div>

      <div className={styles.supplierInfo}>
        <div className={styles.left}>
          <div className={styles.top}>
            <h2>Информация о клиенте</h2>

            <div>
              <Link
                href={{
                  pathname: "/suppliers/edit-supplier",
                  query: {
                    supplierId: supplierId,
                  },
                }}
              >
                <Edit />
              </Link>
              <button onClick={handleDeleteClick}>
                <Delete />
              </button>
            </div>
          </div>

          <ul>
            <li>
              <p>Поставщик</p>
              <p>{supplier?.title}</p>
            </li>
            <li>
              <p>Номер телефона</p>
              <p>{supplier?.phone}</p>
            </li>
            <li>
              <p>Адрес</p>
              <p>{supplier?.address}</p>
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
                {supplier?.createdAt &&
                  format(new Date(supplier?.createdAt), "dd.MM.yyyy hh:mm:ss")}
              </p>
            </li>
            <li>
              <p>Дата изменения</p>
              <p>
                {supplier?.updatedAt &&
                  format(new Date(supplier?.updatedAt), "dd.MM.yyyy hh:mm:ss")}
              </p>
            </li>

            {user?.role === "superadmin" && (
              <li>
                <p>Кто добавил</p>
                <p>
                  {users?.map(
                    (user) =>
                      user?._id === supplier?.addedUserId && (
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
                <p>Кто изменился последним</p>
                <p>
                  {users?.map(
                    (user) =>
                      user?._id === supplier?.changedUserId && (
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
        <h2>Покупки</h2>

        <div className={styles.tableContainer}>
          <table ref={tableRef}>
            <thead>
              <tr>
                <td>Продукта</td>
                <td>Amount</td>
                <td>Сумма</td>
                <td>Дата</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {purchases.length > 0 &&
                purchases.map((purchase) => (
                  <tr key={purchase._id}>
                    <td>{purchase.product?.title}</td>
                    <td>{purchase.amount}</td>
                    <td>
                      {Intl.NumberFormat("ru-RU").format(purchase?.totalPrice)}
                    </td>
                    <td>
                      {format(new Date(purchase.addedDate), "dd.MM.yyyy HH:mm")}
                    </td>
                    <td className={styles.action}>
                      <Link
                        href={{
                          pathname: "/purchases/single-purchase",
                          query: {
                            purchaseId: purchase._id,
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

        {purchases.length < 1 && (
          <div className={styles.empty}>Этот раздел пуст.</div>
        )}
      </div>

      <DeleteModal
        isModalOpen={deleteModal}
        setIsModalOpen={setDeleteModal}
        handleDelete={handleDelete}
      />
    </div>
  );
}
