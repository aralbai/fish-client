"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { ArrowRightAlt, KeyboardBackspace } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { format } from "date-fns";
import TableTop from "@/components/tableTop/TableTop";
import LimitModal from "@/components/limitModal/LimitModal";

export default function Flow() {
  const [purchases, setPurchases] = useState([]);
  const [purchaseId, setPurchaseId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData("/purchases/active", setPurchases);
  }, [isModalOpen]);

  return (
    <div className={styles.products}>
      <h1>Склад</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Покупки</h1>

          <Link href="/">
            <KeyboardBackspace />
            <p>Вернуться к списку</p>
          </Link>
        </div>

        <TableTop tableRef={tableRef} />

        <div className={styles.tableContainer}>
          <table ref={tableRef}>
            <thead>
              <tr>
                <td>Название</td>
                <td>Поставщик</td>
                <td>Количество</td>
                <td>Цена</td>
                <td>Недостаток</td>
                <td>Остальные</td>
                <td>Дата</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {purchases.length > 0 ? (
                purchases?.map((purchase) => (
                  <tr key={purchase._id}>
                    <td>{purchase.product?.title}</td>
                    <td>{purchase.supplier?.title}</td>
                    <td>{purchase.amount}</td>
                    <td>
                      {Intl.NumberFormat("uz-UZ")
                        .format(purchase.totalPrice)
                        .replace(/,/g, " ")}{" "}
                    </td>
                    <td>{purchase.shortage}</td>
                    <td>{purchase.remainingAmount}</td>
                    <td>{format(purchase.addedDate, "dd.MM.yyyy")}</td>
                    <td className={styles.action}>
                      <Link
                        href={{
                          pathname: "/purchases/single-purchase",
                          query: { purchaseId: purchase._id },
                        }}
                      >
                        <ArrowRightAlt />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td style={{ padding: "30px" }}>Этот раздел пуст.</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <LimitModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          purchaseId={purchaseId}
        />
      </div>
    </div>
  );
}
