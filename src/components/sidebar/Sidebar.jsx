"use client";
import Link from "next/link";
import styles from "./Sidebar.module.scss";
import {
  AccountBox,
  Archive,
  ChevronRight,
  Close,
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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Sidebar({ isMobile, setIsMobile, popupRef }) {
  const { user } = useContext(AuthContext);
  const [windowMobile, setWindowMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setWindowMobile(true);
      } else {
        setWindowMobile(false);
      }
    };

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pathname = usePathname();

  const [financeDropdown, setFinanaceDropdown] = useState(false);

  useEffect(() => {
    if (pathname.includes("/finance")) {
      setFinanaceDropdown(true);
    }
  }, [pathname]);

  return (
    <div
      className={`${styles.sidebar} ${isMobile && styles.sidebarMobile}`}
      ref={popupRef}
    >
      <div className={styles.container}>
        <div className={styles.top}>
          <h1>FISH</h1>
          <span onClick={() => setIsMobile(!isMobile)}>
            <Close />
          </span>
        </div>

        <div className={styles.bottom}>
          <ul>
            <li
              onClick={() => {
                setFinanaceDropdown(false),
                  windowMobile && setIsMobile(!isMobile);
              }}
            >
              <Link href="/" className={pathname === "/" ? styles.active : ""}>
                <Dashboard /> Статистика
              </Link>
            </li>

            <li
              onClick={() => {
                setFinanaceDropdown(false),
                  windowMobile && setIsMobile(!isMobile);
              }}
            >
              <Link
                href="/purchases"
                className={pathname.includes("/purchases") ? styles.active : ""}
              >
                <GetApp /> Покупка продукта
              </Link>
            </li>

            <li
              onClick={() => {
                setFinanaceDropdown(false),
                  windowMobile && setIsMobile(!isMobile);
              }}
            >
              <Link
                href="/sells"
                className={pathname.includes("/sells") ? styles.active : ""}
              >
                <FileUpload /> Продажа продукта
              </Link>
            </li>

            <li
              onClick={() => {
                setFinanaceDropdown(false),
                  windowMobile && setIsMobile(!isMobile);
              }}
            >
              <Link
                href="/products"
                className={pathname.includes("/products") ? styles.active : ""}
              >
                <SetMeal /> Продукты
              </Link>
            </li>

            <li
              onClick={() => {
                setFinanaceDropdown(false),
                  windowMobile && setIsMobile(!isMobile);
              }}
            >
              <Link
                href="/custumers"
                className={pathname.includes("/custumers") ? styles.active : ""}
              >
                <AccountBox />
                Клиенты
              </Link>
            </li>

            <li
              onClick={() => {
                setFinanaceDropdown(false),
                  windowMobile && setIsMobile(!isMobile);
              }}
            >
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
                  <Paid /> Финансы
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
                <li onClick={() => windowMobile && setIsMobile(!isMobile)}>
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

                <li onClick={() => windowMobile && setIsMobile(!isMobile)}>
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

                <li onClick={() => windowMobile && setIsMobile(!isMobile)}>
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

            {user?.role === "superadmin" && (
              <li
                onClick={() => {
                  setFinanaceDropdown(false),
                    windowMobile && setIsMobile(!isMobile);
                }}
              >
                <Link
                  href="/users"
                  className={pathname === "/users" ? styles.active : ""}
                >
                  <PermContactCalendar />
                  Пользователи
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
