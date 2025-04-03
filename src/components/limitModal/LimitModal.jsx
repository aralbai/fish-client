import { Close } from "@mui/icons-material";
import styles from "./LimitModal.module.scss";
import Input from "../input/Input";
import PrimaryBtn from "../primaryBtn/PrimaryBtn";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import CheckBox from "../checkBox/CheckBox";

export default function LimitModal({
  isModalOpen,
  setIsModalOpen,
  custumerId,
}) {
  const [custumer, setCustumer] = useState({
    limit: "",
  });
  const [unlimited, setUnlimited] = useState(false);
  const [error, setError] = useState("");

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    if (custumer.limit <= 0 && !unlimited) {
      return setError("Сумма лимита не введена.");
    }

    const data = unlimited ? { limit: -1 } : { limit: custumer.limit };

    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/custumers/limit/${custumerId}`,
        data
      )
      .then((res) => {
        toast.success(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.dat?.message);
      });

    setCustumer({
      limit: "",
    });
    setError("");
    setUnlimited(false);
    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.sellModal}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h2>Лимит клиента</h2>

          <button
            onClick={() => {
              setIsModalOpen(false);
              setError("");
              setCustumer({
                limit: "",
              });
              setUnlimited(false);
            }}
          >
            <Close />
          </button>
        </div>

        <form className={styles.bottom} onSubmit={pageHandleSubmit}>
          <Input
            type="text"
            name="limit"
            placeholder="Муғдары"
            value={custumer.limit}
            setData={setCustumer}
          />

          <div className={styles.unlimited}>
            <CheckBox id="limit" value={unlimited} setData={setUnlimited} />
            <label htmlFor="limit">Unlimited</label>
          </div>

          <p>
            Лимит:{" "}
            {unlimited
              ? "Безлимитный"
              : Intl.NumberFormat("ru-RU").format(custumer.limit)}
          </p>

          <p className={styles.error}>{error}</p>

          <PrimaryBtn type="submit">Сақлаў</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
