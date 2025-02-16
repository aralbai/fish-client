import React from "react";
import styles from "./CheckBox.module.scss";

export default function CheckBox({ id, value, setData }) {
  return (
    <input
      className={styles.checkBox}
      id={id}
      type="checkbox"
      checked={value}
      onChange={(e) => setData(e.target.checked)}
    />
  );
}
