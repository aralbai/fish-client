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
  const withdrawId = searchParams.get("withdrawId");
  const [changedWithdraw, setChangedWithdraw] = useState({
    amount: "",
    toWhom: "",
    addedDate: new Date(),
  });

  useEffect(() => {
    fetchData(`/withdraws/${withdrawId}`, setChangedWithdraw);
  }, []);

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...changedWithdraw,
      changedUserId: user?.id,
    };

    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/withdraws/${withdrawId}`, data)
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
    <ProtectedRoute>
      <div className={styles.editDeposit}>
        <h1>Депозиты</h1>

        <div className={styles.form}>
          <div className={styles.top}>
            <h1>Добавить новый депозит</h1>
            <Link href="/finance/withdraws">
              <KeyboardBackspace />
              <p>Артқа қайтыў</p>
            </Link>
          </div>

          <form onSubmit={pageHandleSubmit}>
            <div className={styles.inputGroup}>
              <div className={styles.formInput}>
                <Input
                  type="number"
                  name="amount"
                  placeholder="Сумма"
                  value={changedWithdraw?.amount}
                  setData={setChangedWithdraw}
                  required={true}
                />

                <p>
                  Сумма:{" "}
                  {changedWithdraw?.amount
                    ? Intl.NumberFormat("ru-RU")
                        .format(changedWithdraw?.amount)
                        .replace(/,/g, " ")
                    : 0}
                </p>
              </div>
              <div className={styles.formInput}>
                <Input
                  type="text"
                  name="toWhom"
                  placeholder="Куда"
                  value={changedWithdraw?.toWhom}
                  setData={setChangedWithdraw}
                  required={false}
                />
              </div>
              <div className={styles.formInput}>
                <DatePick
                  defDate={changedWithdraw?.addedDate}
                  setDate={setChangedWithdraw}
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
