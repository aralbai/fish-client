"use client";
import Link from "next/link";
import styles from "./Sidebar.module.scss";
import {
  AccountBox,
  Dashboard,
  FileUpload,
  GetApp,
  Paid,
  SetMeal,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className={styles.sidebar}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h1>FISH</h1>
        </div>

        <div className={styles.bottom}>
          <ul>
            <li>
              <Link href="/" className={pathname === "/" ? styles.active : ""}>
                <Dashboard /> Statistika
              </Link>
            </li>
            <li>
              <Link
                href="/finance"
                className={pathname === "/finance" ? styles.active : ""}
              >
                <Paid /> Finance
              </Link>
            </li>
            <li>
              <Link
                href="/purchases"
                className={pathname === "/purchases" ? styles.active : ""}
              >
                <GetApp /> Покупка продукта
              </Link>
            </li>
            <li>
              <Link
                href="/sells"
                className={pathname === "/sells" ? styles.active : ""}
              >
                <FileUpload /> Продажа продукта
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={pathname === "/products" ? styles.active : ""}
              >
                <SetMeal /> Продукты
              </Link>
            </li>
            <li>
              <Link
                href="/custumers"
                className={pathname === "/custumers" ? styles.active : ""}
              >
                <AccountBox />
                Клиенты
              </Link>
            </li>
            <li>
              <Link
                href="/suppliers"
                className={pathname === "/suppliers" ? styles.active : ""}
              >
                <AccountBox />
                Поставщики
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
