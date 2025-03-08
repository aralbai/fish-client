"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { AccountBalanceWallet, Add, Delete, Edit } from "@mui/icons-material";
import { use, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { fetchData } from "@/utils/fetchData";
import { handleDelete } from "@/utils/handleDelete";
import TableTop from "@/components/tableTop/TableTop";
import RepayModal from "@/components/repayModal/RepayModal";

export default function Sells() {
  const [sells, setSells] = useState([]);
  const [sellId, setSellId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tableRef = useRef(null);

  useEffect(() => {
    fetchData("/sells", setSells);
  }, []);

  return (
    <div className={styles.products}>
      <h1>Продажи</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Все продажи</h1>
          <Link href="/sells/add-sell">
            <Add />
            Создать новый
          </Link>
        </div>

        <TableTop tableRef={tableRef} />

        <table ref={tableRef}>
          <thead>
            <tr>
              <td>Продукта</td>
              <td>Клиент</td>
              <td>Кол</td>
              <td>Скидка</td>
              <td>Цена</td>
              <td>Долг</td>
              <td>Дата</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {sells.map((sell) => (
              <tr key={sell._id}>
                <td>{sell.product.title}</td>
                <td>{sell.custumer.fullname}</td>
                <td>{sell.amount}</td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format(sell.discount)
                    .replace(/,/g, " ")}
                </td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format(sell.price)
                    .replace(/,/g, " ")}{" "}
                </td>
                <td>
                  {Intl.NumberFormat("uz-UZ")
                    .format(sell.debt)
                    .replace(/,/g, " ")}{" "}
                </td>
                <td>{format(sell.addedDate, "dd.MM.yyyy")}</td>
                <td className={styles.action}>
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

                  <button
                    onClick={() =>
                      handleDelete("/sells", sell._id, sells, setSells)
                    }
                  >
                    <Delete />
                  </button>
                  {sell.debt > 0 && (
                    <button
                      onClick={() => {
                        setSellId(sell._id);
                        setIsModalOpen(true);
                      }}
                    >
                      <AccountBalanceWallet />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sells.length < 1 && (
          <div className={styles.empty}>Этот раздел пуст.</div>
        )}
        <RepayModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          sellId={sellId}
        />
      </div>
    </div>
  );
}
