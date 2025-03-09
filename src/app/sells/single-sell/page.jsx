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

export default function SingleSell() {
  const [sell, setSell] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const sellId = searchParams.get("sellId");

  const tableRef = useRef();

  useEffect(() => {
    fetchData(`/sells/${sellId}`, setSell);
  }, [isModalOpen]);

  const handleDelete = async (e) => {
    e.preventDefault();

    await axios
      .delete(`http://localhost:5000/api/sells/${sellId}`)
      .then((res) => {
        toast.success(res.data);
        router.push("/sells");
      });
  };

  return (
    <div className={styles.singleSell}>
      <h1>Single sell</h1>

      <div className={styles.sellInfo}>
        <div className={styles.left}>
          <div className={styles.top}>
            <h2>Sell info</h2>

            <div>
              <Link
                href={{
                  pathname: "/sells/edit-supplier",
                  query: {
                    sellId: sell._id,
                  },
                }}
              >
                <Edit />
              </Link>

              <button onClick={handleDelete}>
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
              <p>Product</p>
              <p>{sell?.product?.title}</p>
            </li>
            <li>
              <p>Custumer</p>
              <p>{sell?.custumer?.fullname}</p>
            </li>
            <li>
              <p>Amount</p>
              <p>{sell?.amount ? sell.amount : 0}</p>
            </li>
            <li>
              <p>Descount</p>
              <p>{sell?.discount ? sell.discount : 0}</p>
            </li>
            <li>
              <p>Price</p>
              <p>
                {sell?.price
                  ? Intl.NumberFormat("ru-RU").format(sell.price)
                  : 0}
              </p>
            </li>
            <li>
              <p>Debt</p>
              <p>
                {sell?.debt ? Intl.NumberFormat("ru-RU").format(sell.debt) : 0}
              </p>
            </li>
            <li>
              <p>Paid</p>
              <p>
                {sell?.given
                  ? Intl.NumberFormat("ru-RU").format(sell.given)
                  : 0}
              </p>
            </li>
          </ul>
        </div>

        <div className={styles.right}>
          <h2>Sell info</h2>

          <ul>
            <li>
              <p>Added date</p>
              <p>
                {sell?.addedDate &&
                  format(new Date(sell?.addedDate), "dd.MM.yyyy hh:mm:ss")}
              </p>
            </li>
            <li>
              <p>Creaated at</p>
              <p>
                {sell?.createdAt &&
                  format(new Date(sell?.createdAt), "dd.MM.yyyy hh:mm:ss")}
              </p>
            </li>
            <li>
              <p>Updated at</p>
              <p>
                {sell?.updatedAt &&
                  format(new Date(sell?.updatedAt), "dd.MM.yyyy hh:mm:ss")}
              </p>
            </li>
            <li>
              <p>Added user</p>
              <p>{sell?.addedUserId}</p>
            </li>
            <li>
              <p>Last Changed User</p>
              <p>{sell?.changedUserId}</p>
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
            {sell?.repays?.length > 0 &&
              sell?.repays?.map((repay) => (
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

      {sell?.repays?.length < 1 && (
        <div className={styles.empty}>Этот раздел пуст.</div>
      )}

      <RepayModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        sellId={sellId}
      />
    </div>
  );
}
