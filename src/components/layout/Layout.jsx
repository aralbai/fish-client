import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import styles from "./Layout.module.scss";

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.main}>
        <Navbar />
        {children}
      </div>
    </div>
  );
}
