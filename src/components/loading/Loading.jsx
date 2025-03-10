"use client";
import styles from "./Loading.module.scss";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <motion.div
        className={styles.loadingSpinner}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p>Загрузка...</p>
    </div>
  );
}
