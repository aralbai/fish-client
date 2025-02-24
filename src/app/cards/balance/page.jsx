"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import { Add, ArrowRightAlt, Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { handleDelete } from "@/utils/handleDelete";
import { format } from "date-fns";

export default function Balance() {
  const [deposits, setDeposits] = useState([]);
  const [sells, setSells] = useState([]);
  const [outcomes, setOutcomes] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    fetchData("/purchases/total/price", setPurchases);
    fetchData("/outcomes/total", setOutcomes);
    fetchData("/sells/total", setSells);
    fetchData("/deposits/total", setDeposits);
    fetchData("/withdraws/total", setWithdraws);
  }, []);

  const balance =
    deposits.totalDeposits +
    sells.totalSales -
    outcomes.totalOutcomes -
    purchases.totalPurchases -
    withdraws.totalWithdraws;

  const profit = sells.totalSales - purchases.totalPurchases;

  return (
    <div className={styles.products}>
      <h1>Баланс</h1>

      <div className={styles.table}>
        <div className={styles.top}>
          <h1>Баланс</h1>
        </div>

        <table>
          <thead>
            <tr>
              <td>Название</td>
              <td>Сумма</td>
              <td>Действие</td>
            </tr>
          </thead>
          <tbody>
            <tr style={{ backgroundColor: "#4E5CA0", color: "#fff" }}>
              <td>Баланс</td>
              <td>
                {balance ? Intl.NumberFormat("ru-RU").format(balance) : 0}
              </td>
              <td></td>
              <td style={{ padding: "30px" }}></td>
            </tr>
            <tr>
              <td>Покупки</td>
              <td>
                {purchases.totalPurchases
                  ? Intl.NumberFormat("ru-RU").format(purchases.totalPurchases)
                  : 0}
              </td>
              <td>
                <Link href="/purchases">
                  <div>
                    <ArrowRightAlt />
                  </div>
                </Link>
              </td>
            </tr>
            <tr>
              <td>Продажи</td>
              <td>
                {sells.totalSales
                  ? Intl.NumberFormat("ru-RU").format(sells.totalSales)
                  : 0}
              </td>
              <td>
                <Link href="/sells">
                  <div>
                    <ArrowRightAlt />
                  </div>
                </Link>
              </td>
            </tr>
            <tr>
              <td>Расходы</td>
              <td>
                {outcomes.totalOutcomes
                  ? Intl.NumberFormat("ru-RU").format(outcomes.totalOutcomes)
                  : 0}
              </td>
              <td>
                <Link href="/finance/outcomes">
                  <div>
                    <ArrowRightAlt />
                  </div>
                </Link>
              </td>
            </tr>
            <tr>
              <td>Пополнение</td>
              <td>
                {deposits.totalDeposits
                  ? Intl.NumberFormat("ru-RU").format(deposits.totalDeposits)
                  : 0}
              </td>
              <td>
                <Link href="/finance/deposits">
                  <div>
                    <ArrowRightAlt />
                  </div>
                </Link>
              </td>
            </tr>
            <tr>
              <td>Снимать</td>
              <td>
                {withdraws.totalWithdraws
                  ? Intl.NumberFormat("ru-RU").format(withdraws.totalWithdraws)
                  : 0}
              </td>
              <td>
                <Link href="/finance/withdraws">
                  <div>
                    <ArrowRightAlt />
                  </div>
                </Link>
              </td>
            </tr>
            <tr
              style={
                profit < 0
                  ? { backgroundColor: "#28A745", color: "#fff" }
                  : { backgroundColor: "#FF6378", color: "#fff" }
              }
            >
              <td>Прибыль</td>
              <td>
                {balance ? Intl.NumberFormat("ru-RU").format(balance) : 0}
              </td>
              <td></td>
              <td style={{ padding: "30px" }}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
