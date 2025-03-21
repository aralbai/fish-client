import { Close } from "@mui/icons-material";
import styles from "./RepayModal.module.scss";
import Input from "../input/Input";
import PrimaryBtn from "../primaryBtn/PrimaryBtn";
import { useContext, useState } from "react";
import DatePick from "../datePicker/DatePicker";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function RepayModal({
  isModalOpen,
  setIsModalOpen,
  sellId,
  max,
}) {
  const { user } = useContext(AuthContext);
  const [repay, setRepay] = useState({
    amount: "",
    addedDate: new Date(),
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...repay,
      sellId,
      addedUserId: user?.id,
    };

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/repays`, data)
      .then((res) => {
        toast.success(res.data);

        setIsModalOpen(false);

        setRepay({
          amount: "",
          addedDate: new Date(),
        });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  if (!isModalOpen) return null;

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
            type="number"
            name="amount"
            placeholder="Сумма"
            value={repay.amount}
            setData={setRepay}
            max={max}
          />

          <DatePick defDate={repay.addedDate} setDate={setRepay} />

          <p>
            Сумма:{" "}
            {(repay.amount &&
              Intl.NumberFormat("ru-RU").format(repay.amount)) ||
              0}
          </p>

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
