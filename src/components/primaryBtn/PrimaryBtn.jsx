import Link from "next/link";
import styles from "./PrimaryBtn.module.scss";

export default function PrimaryBtn({ type, url, children }) {
  if (type === "button") {
    return <button className={styles.primaryBtn}>{children}</button>;
  } else {
    return (
      <Link href={url} className={styles.primaryBtn}>
        {children}
      </Link>
    );
  }
}
