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
import Link from "next/link";

export default function AddDeposit() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [deposit, setDeposit] = useState({
    amount: "",
    fromWhom: "",
    addedDate: new Date(),
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...deposit,
      addedUserId: user?.id,
    };

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/deposits`, data)
      .then((res) => {
        toast.success(res.data);

        router.push("/finance/deposits");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);

        console.log(err);
      });
  };

  return (
    <div className={styles.addDeposit}>
      <h1>Депозиты</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Добавить новый депозит</h1>
          <Link href="/finance/deposits">
            <KeyboardBackspace />
            <p>Вернуться к списку</p>
          </Link>
        </div>

        <form onSubmit={pageHandleSubmit}>
          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <Input
                type="number"
                name="amount"
                placeholder="Сумма"
                value={deposit.amount}
                setData={setDeposit}
                required={true}
              />

              <p>
                Сумма:{" "}
                {deposit?.amount
                  ? Intl.NumberFormat("ru-RU").format(deposit?.amount)
                  : 0}
              </p>
            </div>
            <div className={styles.formInput}>
              <Input
                type="text"
                name="fromWhom"
                placeholder="Куда"
                value={deposit.fromWhom}
                setData={setDeposit}
                required={false}
              />
            </div>
            <div className={styles.formInput}>
              <DatePick defDate={deposit.addedDate} setDate={setDeposit} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
            </div>
            <div className={styles.formInput}></div>
            <div className={styles.formInput}></div>
          </div>
        </form>
      </div>
    </div>
  );
}
