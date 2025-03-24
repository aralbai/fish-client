"use client";
import { usePathname } from "next/navigation";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import styles from "./Layout.module.scss";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import Loading from "../loading/Loading";

export default function Layout({ children }) {
  const [windowMobile, setWindowMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setWindowMobile(true);
      } else {
        setWindowMobile(false);
      }
    };

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = (event) => {
    event.stopPropagation(); // Prevent event bubbling
    setIsMobile((prev) => !prev);
  };

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        if (windowMobile) {
          setIsMobile(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const path = usePathname();

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
          <div
            className={`${styles.layout} ${isMobile && styles.mobileLayout}`}
          >
            <Sidebar
              isMobile={isMobile}
              setIsMobile={setIsMobile}
              popupRef={popupRef}
            />

            <div className={`${styles.main} ${isMobile && styles.mobileMain}`}>
              <Navbar
                isMobile={isMobile}
                setIsMobile={setIsMobile}
                tgPopup={togglePopup}
              />
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
