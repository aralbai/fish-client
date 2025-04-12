import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import styles from "./Pagination.module.scss";

export default function Pagination({
  page,
  totalPages,
  totalDocuments,
  setPage,
  title,
}) {
  return (
    <div className={styles.pagination}>
      <p>
        {title} {totalDocuments}
      </p>
      <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
        <ChevronLeft /> Назад
      </button>
      <span style={{ margin: "0 1rem" }}>
        Страница {page} из {totalPages}
      </span>
      <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
        Вперед <ChevronRight />
      </button>
    </div>
  );
}
