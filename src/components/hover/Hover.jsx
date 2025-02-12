import styles from "./Hover.module.scss";

export default function Hover({ children, onClick }) {
  return <div className={styles.hover}>{children}</div>;
}
