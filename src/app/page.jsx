"use client";
import Chart from "@/components/chart/Chart";
import styles from "./page.module.scss";
import React, { useContext, useEffect, useState } from "react";
import {
  AccountBalanceWallet,
  AssuredWorkload,
  Paid,
} from "@mui/icons-material";
import Link from "next/link";
import { fetchData } from "@/utils/fetchData";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
  const { user, logout } = useContext(AuthContext);

  const [deposits, setDeposits] = useState([]);
  const [sells, setSells] = useState([]);
  const [outcomes, setOutcomes] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [withdraws, setWithdraws] = useState([]);
  const [purchaseAmount, setPurchaseAmount] = useState([]);
  const [totalDebts, setTotalDebts] = useState(0);

  useEffect(() => {
    fetchData("/purchases/total/price", setPurchases);
    fetchData("/outcomes/total", setOutcomes);
    fetchData("/sells/total", setSells);
    fetchData("/deposits/total", setDeposits);
    fetchData("/withdraws/total", setWithdraws);
    fetchData("/purchases/total/amount", setPurchaseAmount);
    fetchData("/sells/total/debts", setTotalDebts);
  }, []);

  const balance =
    deposits.totalDeposits +
    sells.totalSales -
    outcomes.totalOutcomes -
    purchases.totalPurchases -
    withdraws.totalWithdraws;

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Statiska</h1>

      <div className={styles.cards}>
        {/* <div className={styles.card}> */}
        <Link href="/cards/flow" className={styles.card}>
          <div className={styles.left}>
            <AssuredWorkload className={styles.icon} />
          </div>
          <div className={styles.right}>
            <h2>
              {purchaseAmount.totalAmount ? purchaseAmount.totalAmount : 0}
            </h2>
            <p>Sklad</p>
          </div>
        </Link>
        {/* </div> */}
        <Link href="/cards/balance" className={styles.card}>
          <div className={styles.left}>
            <AccountBalanceWallet className={styles.icon} />
          </div>
          <div className={styles.right}>
            <h2>{balance ? Intl.NumberFormat("ru-RU").format(balance) : 0}</h2>
            <p>Баланс</p>
          </div>
        </Link>
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
        <Link href="/cards/ourDebts" className={styles.card}>
          <div className={styles.left}>
            <Paid className={`${styles.icon} ${styles.danger}`} />
          </div>
          <div className={styles.right}>
            <h2>{Intl.NumberFormat("ru-RU").format(0)}</h2>
            <p>Наши долги</p>
          </div>
        </Link>
      </div>

      <div className={styles.incomeOutcomChart}>
        <div className={styles.top}>
          <h2>Финансы</h2>
        </div>

        <div className={styles.bottom}>
          <Chart />
        </div>
      </div>
    </div>
  );
}
