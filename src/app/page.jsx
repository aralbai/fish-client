"use client";
import Chart from "@/components/chart/Chart";
import styles from "./page.module.scss";
import React from "react";

export default function Home() {
  return (
    <div className={styles.home}>
      <h1>Statiska</h1>

      <div className={styles.container}>
        <div className={styles.card}>
          <h1>120</h1>
        </div>
        <div className={styles.card}>
          <h1>120</h1>
        </div>
        <div className={styles.card}>
          <h1>120</h1>
        </div>
        <div className={styles.card}>
          <h1>120</h1>
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
