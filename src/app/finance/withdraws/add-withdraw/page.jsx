"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useContext, useState } from "react";
import Input from "@/components/input/Input";
import DatePick from "@/components/datePicker/DatePicker";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddWithdraw() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [withdraw, setWithdraw] = useState({
    amount: "",
    toWhom: "",
    addedDate: new Date(),
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...withdraw,
      addedUserId: user?.id,
    };

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/withdraws`, data)
      .then((res) => {
        toast.success(res.data);

        router.push("/finance/withdraws");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log(err);
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
          <div className={styles.inputGroup}>
            <div className={styles.formInput}>
              <Input
                type="number"
                name="amount"
                placeholder="Сумма"
                value={withdraw.amount}
                setData={setWithdraw}
                required={true}
              />

              <p>
                Сумма:{" "}
                {withdraw?.amount
                  ? Intl.NumberFormat("ru-RU").format(withdraw?.amount)
                  : 0}
              </p>
            </div>
            <div className={styles.formInput}>
              <Input
                type="text"
                name="toWhom"
                placeholder="Куда"
                value={withdraw.toWhom}
                setData={setWithdraw}
                required={false}
              />
            </div>
            <div className={styles.formInput}>
              <DatePick defDate={withdraw.addedDate} setDate={setWithdraw} />
            </div>
          </div>

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
