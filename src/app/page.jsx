"use client";
import Chart from "@/components/chart/Chart";
import styles from "./page.module.scss";
import React, { useEffect, useState } from "react";
import {
  AccountBalanceWallet,
  AssuredWorkload,
  Paid,
} from "@mui/icons-material";
import Link from "next/link";
import { fetchData } from "@/utils/fetchData";

export default function Home() {
  const [purchases, setPurchases] = useState([]);

  let total = 0;
  purchases.forEach((purchase) => {
    total += purchase.remainingAmount + purchase.shortage;
  });

  useEffect(() => {
    fetchData("/purchases/active", setPurchases);
  }, []);

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Statiska</h1>

      <div className={styles.cards}>
        {/* <div className={styles.card}> */}
        <Link href="/flow" className={styles.card}>
          <div className={styles.left}>
            <AssuredWorkload className={styles.icon} />
          </div>
          <div className={styles.right}>
            <h2>
              {total} <b>kg</b>
            </h2>
            <p>Sklad</p>
          </div>
        </Link>
        {/* </div> */}
        <div className={styles.card}>
          <div className={styles.left}>
            <AccountBalanceWallet className={styles.icon} />
          </div>
          <div className={styles.right}>
            <h2>{Intl.NumberFormat("ru-RU").format(189000000)}</h2>
            <p>Баланс</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.left}>
            <Paid className={`${styles.icon} ${styles.success}`} />
          </div>
          <div className={styles.right}>
            <h2>{Intl.NumberFormat("ru-RU").format(20000000)}</h2>
            <p>Долги</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.left}>
            <Paid className={`${styles.icon} ${styles.danger}`} />
          </div>
          <div className={styles.right}>
            <h2>{Intl.NumberFormat("ru-RU").format(15000000)}</h2>
            <p>Наши долги</p>
          </div>
        </div>
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
