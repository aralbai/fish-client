"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import { fetchData } from "@/utils/fetchData";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { AccountBalanceWallet, Delete, Edit } from "@mui/icons-material";
import RepayModal from "@/components/repayModal/RepayModal";
import axios from "axios";
import { toast } from "react-toastify";

export default function SinglePurchase() {
  const [purchase, setPurchase] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const purchaseId = searchParams.get("purchaseId");

  const tableRef = useRef();

  useEffect(() => {
    fetchData(`/purchases/${purchaseId}`, setPurchase);
  }, [isModalOpen]);

  const handleDelete = async (e) => {
    e.preventDefault();

    await axios
      .delete(`http://localhost:5000/api/purchases/${purchaseId}`)
      .then((res) => {
        toast.success(res.data);
        router.push("/purchases");
      });
  };

  return (
    <div className={styles.singlePurchase}>
      <h1>Single purchase</h1>

      <div className={styles.purchaseInfo}>
        <div className={styles.left}>
          <div className={styles.top}>
            <h2>purchase info</h2>

            <div>
              <Link
                href={{
                  pathname: "/purchases/edit-supplier",
                  query: {
                    purchaseId: purchase._id,
                  },
                }}
              >
                <Edit />
              </Link>

              <button onClick={handleDelete}>
                <Delete />
              </button>

              {purchase?.debt > 0 && (
                <button onClick={() => setIsModalOpen(true)}>
                  <AccountBalanceWallet />
                </button>
              )}
            </div>
          </div>
          <ul>
            <li>
              <p>Product</p>
              <p>{purchase?.product?.title}</p>
            </li>
            <li>
              <p>Supplier</p>
              <p>{purchase?.supplier?.title}</p>
            </li>
            <li>
              <p>Car</p>
              <p>{purchase?.carNumber}</p>
            </li>
            <li>
              <p>Amount</p>
              <p>{purchase?.amount ? purchase.amount : 0}</p>
            </li>
            <li>
              <p>Descount</p>
              <p>{purchase?.discount ? purchase.discount : 0}</p>
            </li>
            <li>
              <p>Price</p>
              <p>
                {purchase?.price
                  ? Intl.NumberFormat("ru-RU").format(purchase.price)
                  : 0}
              </p>
            </li>
            <li>
              <p>Debt</p>
              <p>
                {purchase?.debt
                  ? Intl.NumberFormat("ru-RU").format(purchase.debt)
                  : 0}
              </p>
            </li>
            <li>
              <p>Paid</p>
              <p>
                {purchase?.given
                  ? Intl.NumberFormat("ru-RU").format(purchase.given)
                  : 0}
              </p>
            </li>
          </ul>
        </div>

        <div className={styles.right}>
          <h2>purchase info</h2>

          <ul>
            <li>
              <p>Added date</p>
              <p>
                {purchase?.addedDate &&
                  format(new Date(purchase?.addedDate), "dd.MM.yyyy hh:mm:ss")}
              </p>
            </li>
            <li>
              <p>Creaated at</p>
              <p>
                {purchase?.createdAt &&
                  format(new Date(purchase?.createdAt), "dd.MM.yyyy hh:mm:ss")}
              </p>
            </li>
            <li>
              <p>Updated at</p>
              <p>
                {purchase?.updatedAt &&
                  format(new Date(purchase?.updatedAt), "dd.MM.yyyy hh:mm:ss")}
              </p>
            </li>
            <li>
              <p>Added user</p>
              <p>{purchase?.addedUserId}</p>
            </li>
            <li>
              <p>Last Changed User</p>
              <p>{purchase?.changedUserId}</p>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.repays}>
        <h2>Repays</h2>

        <table ref={tableRef}>
          <thead>
            <tr>
              <td>Продукта</td>
              <td>Дата</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {purchase?.repays?.length > 0 &&
              purchase?.repays?.map((repay) => (
                <tr key={repay._id}>
                  <td>{repay.amount}</td>
                  <td>
                    {repay?.date &&
                      format(new Date(repay?.date), "dd.MM.yyyy hh:mm:ss")}
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
                    // onClick={() =>
                    //   handleDelete("/repays", repay._id, repays, setrepays)
                    // }
                    >
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {purchase?.repays?.length < 1 && (
        <div className={styles.empty}>Этот раздел пуст.</div>
      )}

      <RepayModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        purchaseId={purchaseId}
      />
    </div>
  );
}
