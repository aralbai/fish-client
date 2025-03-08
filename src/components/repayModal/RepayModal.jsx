import { Close } from "@mui/icons-material";
import styles from "./RepayModal.module.scss";
import Input from "../input/Input";
import PrimaryBtn from "../primaryBtn/PrimaryBtn";
import { useState } from "react";
import { handleSubmit } from "@/utils/handleSubmit";

export default function RepayModal({
  isModalOpen,
  setIsModalOpen,
  purchaseId,
}) {
  const [purchase, setPurchase] = useState({
    shortage: "",
  });

  const pageHandleSubmit = (e) => {
    e.preventDefault();

    handleSubmit(e, purchaseId, "purchases/shortage", purchase, setPurchase);

    setIsModalOpen(false);

    setPurchase({
      shortage: "",
    });
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.sellModal}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h2>Недостаток товаров</h2>

          <button onClick={() => setIsModalOpen(false)}>
            <Close />
          </button>
        </div>

        <form className={styles.bottom} onSubmit={pageHandleSubmit}>
          <Input
            type="text"
            name="shortage"
            placeholder="Количество"
            value={purchase.shortage}
            setData={setPurchase}
          />

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
