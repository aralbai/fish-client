import { Close, Payment } from "@mui/icons-material";
import styles from "./RepayModal.module.scss";
import Input from "../input/Input";
import PrimaryBtn from "../primaryBtn/PrimaryBtn";
import { useState } from "react";
import { handleSubmit } from "@/utils/handleSubmit";
import DatePick from "../datePicker/DatePicker";

export default function RepayModal({ isModalOpen, setIsModalOpen, sellId }) {
  const [repay, setRepay] = useState({
    amount: "",
    paymentDate: new Date(),
  });

  const pageHandleSubmit = (e) => {
    e.preventDefault();

    handleSubmit(e, sellId, "sells/repay", repay, setRepay);

    setIsModalOpen(false);

    setRepay({
      amount: "",
      paymentDate: new Date(),
    });
  };

  if (!isModalOpen) return null;

  console.log(repay);

  return (
    <div className={styles.sellModal}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h2>Оплатить долг</h2>

          <button onClick={() => setIsModalOpen(false)}>
            <Close />
          </button>
        </div>

        <form className={styles.bottom} onSubmit={pageHandleSubmit}>
          <Input
            type="text"
            name="amount"
            placeholder="Сумма"
            value={repay.amount}
            setData={setRepay}
          />

          <DatePick defDate={repay.paymentDate} setDate={setRepay} />

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
