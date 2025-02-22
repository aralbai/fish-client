"use client";
import Link from "next/link";
import styles from "./Sidebar.module.scss";
import {
  AccountBox,
  AddBox,
  Archive,
  ChevronRight,
  Dashboard,
  DisabledByDefault,
  FileUpload,
  GetApp,
  KeyboardArrowDown,
  Paid,
  PermContactCalendar,
  SetMeal,
  Unarchive,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();

  const [financeDropdown, setFinanaceDropdown] = useState(false);

  useEffect(() => {
    if (pathname.includes("/finance")) {
      setFinanaceDropdown(true);
    }
  }, [pathname]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h1>FISH</h1>
        </div>

        <div className={styles.bottom}>
          <ul>
            <li onClick={() => setFinanaceDropdown(false)}>
              <Link href="/" className={pathname === "/" ? styles.active : ""}>
                <Dashboard /> Statistika
              </Link>
            </li>

            <li onClick={() => setFinanaceDropdown(false)}>
              <Link
                href="/purchases"
                className={pathname.includes("/purchases") ? styles.active : ""}
              >
                <GetApp /> Покупка продукта
              </Link>
            </li>

            <li onClick={() => setFinanaceDropdown(false)}>
              <Link
                href="/sells"
                className={pathname.includes("/sells") ? styles.active : ""}
              >
                <FileUpload /> Продажа продукта
              </Link>
            </li>

            <li onClick={() => setFinanaceDropdown(false)}>
              <Link
                href="/products"
                className={pathname.includes("/products") ? styles.active : ""}
              >
                <SetMeal /> Продукты
              </Link>
            </li>

            <li onClick={() => setFinanaceDropdown(false)}>
              <Link
                href="/custumers"
                className={pathname.includes("/custumers") ? styles.active : ""}
              >
                <AccountBox />
                Клиенты
              </Link>
            </li>

            <li onClick={() => setFinanaceDropdown(false)}>
              <Link
                href="/suppliers"
                className={pathname.includes("/suppliers") ? styles.active : ""}
              >
                <AccountBox />
                Поставщики
              </Link>
            </li>

            <li className={styles.dropdown}>
              <div
                className={styles.dropdownHead}
                onClick={() => setFinanaceDropdown(!financeDropdown)}
              >
                <div>
                  <Paid /> Finance
                </div>
                <div>
                  {financeDropdown ? <KeyboardArrowDown /> : <ChevronRight />}
                </div>
              </div>

              <ul
                className={
                  financeDropdown
                    ? `${styles.dropdownBody} ${styles.dropdownOpen}`
                    : `${styles.dropdownBody} ${styles.dropdownClose}`
                }
              >
                <li>
                  <Link
                    href="/finance/outcomes"
                    className={
                      pathname.includes("/finance/outcomes")
                        ? styles.active
                        : ""
                    }
                  >
                    <DisabledByDefault />
                    Расход
                  </Link>
                </li>

                <li>
                  <Link
                    href="/finance/deposits"
                    className={
                      pathname.includes("/finance/deposits")
                        ? styles.active
                        : ""
                    }
                  >
                    <Archive />
                    Пополнение
                  </Link>
                </li>

                <li>
                  <Link
                    href="/finance/withdraws"
                    className={
                      pathname.includes("/finance/withdraws")
                        ? styles.active
                        : ""
                    }
                  >
                    <Unarchive />
                    Снимать
                  </Link>
                </li>
              </ul>
            </li>

            <li onClick={() => setFinanaceDropdown(false)}>
              <Link
                href="/users"
                className={pathname === "/users" ? styles.active : ""}
              >
                <PermContactCalendar />
                Пользователи
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
