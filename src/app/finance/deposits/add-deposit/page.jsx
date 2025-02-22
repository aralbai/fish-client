"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useState } from "react";
import Input from "@/components/input/Input";
import { handleSubmit } from "@/utils/handleSubmit";
import DatePick from "@/components/datePicker/DatePicker";

export default function AddDeposit() {
  const [deposit, setDeposit] = useState({
    amount: "",
    fromWhom: "",
    addedDate: new Date(),
  });

  const pageHandleSubmit = (e) => {
    const data = {
      ...deposit,
      type: "increase",
    };

    handleSubmit(e, "create", "deposits", data, setDeposit);

    setDeposit({
      amount: "",
      fromWhom: "",
      addedDate: new Date(),
    });
  };

  return (
    <div className={styles.addProduct}>
      <h1>Депозиты</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Добавить новый депозит</h1>
          <PrimaryBtn
            type="link"
            fullname="Вернуться к списку"
            url="/finance/deposits"
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
            value={deposit.amount}
            setData={setDeposit}
            required={true}
          />
          <Input
            type="text"
            name="fromWhom"
            placeholder="От кого"
            value={deposit.fromWhom}
            setData={setDeposit}
            required={false}
          />
          <DatePick defDate={deposit.addedDate} setDate={setDeposit} />

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
