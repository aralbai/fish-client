"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useState } from "react";
import Input from "@/components/input/Input";
import { handleSubmit } from "@/utils/handleSubmit";
import DatePick from "@/components/datePicker/DatePicker";

export default function AddOutcome() {
  const [outcome, setOutcome] = useState({
    amount: "",
    purpose: "",
    addedDate: new Date(),
  });

  const pageHandleSubmit = (e) => {
    handleSubmit(e, "create", "outcomes", outcome, setOutcome);

    setOutcome({
      amount: "",
      purpose: "",
      addedDate: new Date(),
    });
  };

  return (
    <div className={styles.addProduct}>
      <h1>Расходы</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Добавить новый расход</h1>
          <PrimaryBtn
            type="link"
            fullname="Вернуться к списку"
            url="/finance/outcomes"
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
            value={outcome.amount}
            setData={setOutcome}
            required={true}
          />
          <Input
            type="text"
            name="purpose"
            placeholder="Куда"
            value={outcome.purpose}
            setData={setOutcome}
            required={false}
          />
          <DatePick defDate={outcome.addedDate} setDate={setOutcome} />

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
