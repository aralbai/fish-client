"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useState } from "react";
import Input from "@/components/input/Input";
import { handleSubmit } from "@/utils/handleSubmit";
import DatePick from "@/components/datePicker/DatePicker";

export default function AddWithdraw() {
  const [withdraw, setWithdraw] = useState({
    amount: "",
    toWhom: "",
    addedDate: new Date(),
  });

  const pageHandleSubmit = (e) => {
    handleSubmit(e, "create", "withdraws", withdraw, setWithdraw);

    setWithdraw({
      amount: "",
      toWhom: "",
      addedDate: new Date(),
    });
  };

  return (
    <div className={styles.addProduct}>
      <h1>Снятия</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Добавить новый снимать</h1>
          <PrimaryBtn
            type="link"
            fullname="Вернуться к списку"
            url="/finance/withdraws"
            icon={<KeyboardBackspace />}
          >
            <KeyboardBackspace />
            Вернуться к списку
          </PrimaryBtn>
        </div>

        <form onSubmit={pageHandleSubmit}>
          <Input
            type="number"
            name="amount"
            placeholder="Сумма"
            value={withdraw.amount}
            setData={setWithdraw}
            required={true}
          />
          <Input
            type="text"
            name="toWhom"
            placeholder="От кого"
            value={withdraw.toWhom}
            setData={setWithdraw}
            required={false}
          />
          <DatePick defDate={withdraw.addedDate} setDate={setWithdraw} />

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
