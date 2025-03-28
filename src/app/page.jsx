"use client";
import Chart from "@/components/chart/Chart";
import styles from "./page.module.scss";
import { useContext, useEffect, useState } from "react";
import {
  AccountBalanceWallet,
  AssuredWorkload,
  Paid,
  PermContactCalendar,
} from "@mui/icons-material";
import Link from "next/link";
import { fetchData } from "@/utils/fetchData";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [deposits, setDeposits] = useState([]);
  const [sells, setSells] = useState([]);
  const [outcomes, setOutcomes] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [withdraws, setWithdraws] = useState([]);
  const [purchaseAmount, setPurchaseAmount] = useState([]);
  const [totalDebts, setTotalDebts] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData("/purchases/total/price", setPurchases);
    fetchData("/outcomes/total", setOutcomes);
    fetchData("/sells/total", setSells);
    fetchData("/deposits/total", setDeposits);
    fetchData("/withdraws/total", setWithdraws);
    fetchData("/purchases/total/amount", setPurchaseAmount);
    fetchData("/sells/total/debts", setTotalDebts);
    fetchData("/users", setUsers);
  }, []);

  const balance =
    deposits.totalDeposits +
    sells.totalSales -
    outcomes.totalOutcomes -
    purchases.totalPurchases -
    withdraws.totalWithdraws;

  console.log(outcomes.totalOutcomes);
  return (
    <ProtectedRoute>
      <div className={styles.home}>
        <h1 className={styles.title}>Statiska</h1>

        <div className={styles.cards}>
          <div className={styles.row}>
            <Link href="/cards/flow" className={styles.card}>
              <div className={styles.left}>
                <AssuredWorkload className={styles.icon} />
              </div>
              <div className={styles.right}>
                <h2>
                  {purchaseAmount.totalAmount
                    ? Intl.NumberFormat("ru-RU").format(
                        purchaseAmount.totalAmount
                      )
                    : 0}
                </h2>
                <p>Sklad</p>
              </div>
            </Link>

            <Link
              href={user?.role === "superadmin" ? "/cards/balance" : "/"}
              className={styles.card}
            >
              <div className={styles.left}>
                <AccountBalanceWallet className={styles.icon} />
              </div>
              <div className={styles.right}>
                <h2>
                  {balance ? Intl.NumberFormat("ru-RU").format(balance) : 0}
                </h2>
                <p>Баланс</p>
              </div>
            </Link>
          </div>

          <div className={styles.row}>
            <Link href="/cards/debts" className={styles.card}>
              <div className={styles.left}>
                <Paid className={`${styles.icon} ${styles.success}`} />
              </div>
              <div className={styles.right}>
                <h2>
                  {totalDebts.totalDebts
                    ? Intl.NumberFormat("ru-RU").format(totalDebts.totalDebts)
                    : 0}
                </h2>
                <p>Долги</p>
              </div>
            </Link>

            <Link
              href={user?.role === "superadmin" ? "/users" : ""}
              className={styles.card}
            >
              <div className={styles.left}>
                <PermContactCalendar className={styles.icon} />
              </div>
              <div className={styles.right}>
                <h2>
                  {users.length > 0 && user?.role === "superadmin"
                    ? users.length
                    : 0}
                </h2>
                <p>Пользователи</p>
              </div>
            </Link>
          </div>
        </div>

        {user?.role && user?.role === "superadmin" && (
          <div className={styles.incomeOutcomChart}>
            <div className={styles.top}>
              <h2>Финансы</h2>
            </div>

            <div className={styles.bottom}>
              <Chart />
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
