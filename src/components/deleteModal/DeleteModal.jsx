import { Close } from "@mui/icons-material";
import styles from "./DeleteModal.module.scss";

export default function DeleteModal({
  isModalOpen,
  setIsModalOpen,
  handleDelete,
}) {
  if (!isModalOpen) return null;

  return (
    <div className={styles.sellModal}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h2>Удалить элемент</h2>

          <button onClick={() => setIsModalOpen(false)}>
            <Close />
          </button>
        </div>

        <div className={styles.bottom}>
          <p>Вы уверены, что хотите удалить этот элемент?</p>
          <div>
            <button type="submit" onClick={handleDelete}>
              Да
            </button>
            <button type="submit" onClick={() => setIsModalOpen(false)}>
              Хет
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
