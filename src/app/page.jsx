"use client";
import Chart from "@/components/chart/Chart";
import styles from "./page.module.scss";
import React, { useState } from "react";
import { AssuredWorkload } from "@mui/icons-material";

export default function Home() {
  const [purchases, setPurchases] = useState([]);

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Statiska</h1>

      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.left}>
            <AssuredWorkload className={styles.icon} />
          </div>
          <div className={styles.right}>
            <h2>
              1234 <b>kg</b>
            </h2>
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
