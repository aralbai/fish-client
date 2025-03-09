"use client";
import { usePathname } from "next/navigation";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import styles from "./Layout.module.scss";
import { AuthProvider } from "@/context/AuthContext";

export default function Layout({ children }) {
  const path = usePathname();

  if (path === "/login") {
    return (
      <AuthProvider>
        <div>{children}</div>;
      </AuthProvider>
    );
  } else {
    return (
      <AuthProvider>
        <div className={styles.layout}>
          <Sidebar />

          <div className={styles.main}>
            <Navbar />
            {children}
          </div>
        </div>
      </AuthProvider>
    );
  }
}
