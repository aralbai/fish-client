import { Close } from "@mui/icons-material";
import styles from "./LimitModal.module.scss";
import Input from "../input/Input";
import PrimaryBtn from "../primaryBtn/PrimaryBtn";
import { useState } from "react";
import { handleSubmit } from "@/utils/handleSubmit";

export default function ShortageModal({
  isModalOpen,
  setIsModalOpen,
  purchaseId,
}) {
  const [purchase, setPurchase] = useState({
    limit: "",
  });

  const pageHandleSubmit = (e) => {
    e.preventDefault();

    handleSubmit(e, purchaseId, "purchases/shortage", purchase, setPurchase);

    setIsModalOpen(false);

    setPurchase({
      limit: "",
    });
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.sellModal}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h2>Установить лимит</h2>

          <button onClick={() => setIsModalOpen(false)}>
            <Close />
          </button>
        </div>

        <form className={styles.bottom} onSubmit={pageHandleSubmit}>
          <Input
            type="text"
            name="limit"
            placeholder="Лимит"
            value={purchase.limit}
            setData={setPurchase}
          />

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
