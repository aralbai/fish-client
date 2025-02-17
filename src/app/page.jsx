"use client";
import Chart from "@/components/chart/Chart";
import styles from "./page.module.scss";
import React, { useEffect, useState } from "react";
import { AssuredWorkload } from "@mui/icons-material";
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
            <AssuredWorkload />
          </div>
          <div className={styles.right}>
            <h2>1234</h2>
            <p>Sklad</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.left}>
            <AssuredWorkload />
          </div>
          <div className={styles.right}>
            <h2>1234</h2>
            <p>Sklad</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.left}>
            <AssuredWorkload />
          </div>
          <div className={styles.right}>
            <h2>1234</h2>
            <p>Sklad</p>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Chart />
      </div>
    </div>
  );
}
