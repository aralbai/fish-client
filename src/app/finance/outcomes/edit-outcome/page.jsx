"use client";
import styles from "./page.module.scss";
import Input from "@/components/input/Input";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { KeyboardBackspace } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import DatePick from "@/components/datePicker/DatePicker";
import Link from "next/link";

export default function EditOutcome() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const searchParams = useSearchParams();
  const outcomeId = searchParams.get("outcomeId");
  const [changedOutcome, setChangedOutcome] = useState({
    amount: "",
    purpose: "",
    addedDate: new Date(),
  });

  useEffect(() => {
    fetchData(`/outcomes/${outcomeId}`, setChangedOutcome);
  }, []);

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...changedOutcome,
      changedUserId: user?.id,
    };

    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/outcomes/${outcomeId}`, data)
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
    <div className={styles.editOutcome}>
      <h1>Расходы</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Изменить расход</h1>
          <Link href="/finance/outcomes">
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
                value={changedOutcome.amount}
                setData={setChangedOutcome}
                required={true}
              />

              <p>
                Сумма:{" "}
                {changedOutcome?.amount
                  ? Intl.NumberFormat("ru-RU").format(changedOutcome?.amount)
                  : 0}
              </p>
            </div>
            <div className={styles.formInput}>
              <Input
                type="text"
                name="purpose"
                placeholder="Куда"
                value={changedOutcome.purpose}
                setData={setChangedOutcome}
                required={false}
              />
            </div>
            <div className={styles.formInput}>
              <DatePick
                defDate={changedOutcome.addedDate}
                setDate={setChangedOutcome}
              />
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
