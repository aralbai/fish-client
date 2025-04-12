"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useContext, useEffect, useState } from "react";
import Input from "@/components/input/Input";
import DatePick from "@/components/datePicker/DatePicker";
import { AuthContext } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchData } from "@/utils/fetchData";
import Link from "next/link";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

export default function EditDeposit() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const depositId = searchParams.get("depositId");
  const [changedDeposit, setChangedDeposit] = useState({
    amount: "",
    fromWhom: "",
    addedDate: new Date(),
  });

  useEffect(() => {
    fetchData(`/deposits/${depositId}`, setChangedDeposit);
  }, []);

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...changedDeposit,
      changedUserId: user?.id,
    };

    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/deposits/${depositId}`, data)
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
    <ProtectedRoute>
      <div className={styles.editDeposit}>
        <h1>Депозиты</h1>

        <div className={styles.form}>
          <div className={styles.top}>
            <h1>Добавить новый депозит</h1>
            <Link href="/finance/deposits">
              <KeyboardBackspace />
              <p></p>
            </Link>
          </div>

          <form onSubmit={pageHandleSubmit}>
            <div className={styles.inputGroup}>
              <div className={styles.formInput}>
                <Input
                  type="number"
                  name="amount"
                  placeholder="Сумма"
                  value={changedDeposit.amount}
                  setData={setChangedDeposit}
                  required={true}
                />

                <p>
                  Сумма:{" "}
                  {changedDeposit?.amount
                    ? Intl.NumberFormat("ru-RU").format(changedDeposit?.amount)
                    : 0}
                </p>
              </div>
              <div className={styles.formInput}>
                <Input
                  type="text"
                  name="fromWhom"
                  placeholder="Куда"
                  value={changedDeposit.fromWhom}
                  setData={setChangedDeposit}
                  required={false}
                />
              </div>
              <div className={styles.formInput}>
                <DatePick
                  defDate={changedDeposit.addedDate}
                  setDate={setChangedDeposit}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.formInput}>
                <PrimaryBtn type="submit">Сақлаў</PrimaryBtn>
              </div>
              <div className={styles.formInput}></div>
              <div className={styles.formInput}></div>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
