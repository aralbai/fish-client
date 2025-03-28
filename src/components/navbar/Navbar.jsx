"use client";
import {
  AccountCircle,
  Menu,
  PowerSettingsNew,
  Settings,
} from "@mui/icons-material";
import styles from "./Navbar.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function Navbar({ isMobile, setIsMobile, tgPopup }) {
  const { user, logout } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    setIsOpen((prev) => !prev);
  };

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.navbar} ${isMobile && styles.navbarMobile}`}>
      <div className={styles.menu} onClick={tgPopup}>
        <Menu className={styles.menuIcon} />
      </div>

      <div className={styles.user} onClick={togglePopup}>
        <div className={styles.account}>
          <p>{user?.username}</p>
          <span>
            <AccountCircle className={styles.icon} />
          </span>
        </div>

        {isOpen && (
          <ul
            ref={popupRef}
            className={styles.popup}
            onClick={(e) => e.stopPropagation()}
          >
            <li>
              <Link href={user?.role === "superadmin" ? "/profile" : "/"}>
                <Settings />
                Настройки
              </Link>
            </li>
            <li onClick={logout}>
              <PowerSettingsNew />
              Выход
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
