"use client";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import styles from "./Layout.module.scss";
import { AuthContext, AuthProvider } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Loading from "../loading/Loading";

export default function Layout({ children }) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    if (path === "/login") {
      return <div>{children}</div>;
    } else {
      if (user) {
        return (
          <div className={styles.layout}>
            <Sidebar />

            <div className={styles.main}>
              <Navbar />
              {children}
            </div>
          </div>
        );
      } else {
        return <>{children}</>;
      }
    }
  }
}
