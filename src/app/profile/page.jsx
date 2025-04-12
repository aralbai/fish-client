"use client";
import {
  AccountCircle,
  Email,
  Info,
  Lock,
  Settings,
  TypeSpecimen,
} from "@mui/icons-material";
import styles from "./page.module.scss";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

export default function Profile() {
  const pathname = usePathname();
  const { user } = useContext(AuthContext);

  return (
    <ProtectedRoute>
      <div className={styles.profile}>
        <ul className={styles.bar}>
          <li className={pathname === "/profile" ? styles.active : ""}>
            <Link href="/profile">
              <Info />
              <p>Информация</p>
            </Link>
          </li>
          <li className={pathname === "/profile/change" ? styles.active : ""}>
            <Link href="/profile/change">
              <Settings />
              <p>Изменить аккаунт</p>
            </Link>
          </li>
          <li className={pathname === "/profile/password" ? styles.active : ""}>
            <Link href="/profile/password">
              <Lock />
              <p>Изменить пароль</p>
            </Link>
          </li>
        </ul>

        <div className={styles.info}>
          <div className={styles.top}></div>

          <div className={styles.bottom}>
            <h2>{user?.fullname}</h2>

            <span>
              <p>
                <AccountCircle />
                {user?.username}
              </p>

              <p>
                <Email />
                {user?.email}
              </p>

              <p>
                <TypeSpecimen />
                {user?.role}
              </p>
            </span>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
