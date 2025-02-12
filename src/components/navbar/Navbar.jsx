import { Menu } from "@mui/icons-material";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.menu}>
        <Menu className={styles.menuIcon} />
      </div>

      <div></div>
    </div>
  );
}
