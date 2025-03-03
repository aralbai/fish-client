"use client";
import styles from "./TableTop.module.scss";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { SystemUpdateAlt } from "@mui/icons-material";

export default function TableTop({ tableRef }) {
  const exportToExcel = () => {
    if (!tableRef.current) return;

    // Convert the table to a worksheet
    const workbook = XLSX.utils.table_to_book(tableRef.current);
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create a Blob and trigger download
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(data, "exported_data.xlsx");
  };

  return (
    <div className={styles.tableTop}>
      <div></div>
      <button onClick={exportToExcel} className={styles.excelButton}>
        <SystemUpdateAlt /> Export to Excel
      </button>
    </div>
  );
}
