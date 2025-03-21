"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useContext, useState } from "react";
import Input from "@/components/input/Input";
import DatePick from "@/components/datePicker/DatePicker";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddOutcome() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [outcome, setOutcome] = useState({
    amount: "",
    purpose: "",
    addedDate: new Date(),
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...outcome,
      addedUserId: user?.id,
    };

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/outcomes`, data)
      .then((res) => {
        toast.success(res.data);

        router.push("/finance/outcomes");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log(err);
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
          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <Input
                type="number"
                name="amount"
                placeholder="Сумма"
                value={outcome.amount}
                setData={setOutcome}
                required={true}
              />

              <p>
                Сумма:{" "}
                {outcome?.amount
                  ? Intl.NumberFormat("ru-RU").format(outcome?.amount)
                  : 0}
              </p>
            </div>
            <div className={styles.formInput}>
              <Input
                type="text"
                name="purpose"
                placeholder="Куда"
                value={outcome.purpose}
                setData={setOutcome}
                required={false}
              />
            </div>
            <div className={styles.formInput}>
              <DatePick defDate={outcome.addedDate} setDate={setOutcome} />
            </div>
          </div>

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
