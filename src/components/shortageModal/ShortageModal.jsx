import { Close } from "@mui/icons-material";
import styles from "./ShortageModal.module.scss";
import Input from "../input/Input";
import PrimaryBtn from "../primaryBtn/PrimaryBtn";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ShortageModal({
  isModalOpen,
  setIsModalOpen,
  purchaseId,
}) {
  const [purchase, setPurchase] = useState({
    shortage: "",
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/purchases/shortage/${purchaseId}`,
        purchase
      )
      .then((res) => {
        toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });

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
          <h2>Кемшилик</h2>

          <button onClick={() => setIsModalOpen(false)}>
            <Close />
          </button>
        </div>

        <form className={styles.bottom} onSubmit={pageHandleSubmit}>
          <Input
            type="text"
            name="shortage"
            placeholder="Муғдары"
            value={purchase.shortage}
            setData={setPurchase}
          />

          <PrimaryBtn type="submit">Сақлаў</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
