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

export default function Navbar() {
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
    <div className={styles.navbar}>
      <div className={styles.menu}>
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
              <Link href="/profile">
                <Settings />
                Settings
              </Link>
            </li>
            <li onClick={logout}>
              <PowerSettingsNew />
              Logout
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
