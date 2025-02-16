import { Close } from "@mui/icons-material";
import styles from "./CustumerModal.module.scss";
import Input from "../input/Input";
import PrimaryBtn from "../primaryBtn/PrimaryBtn";
import { useState } from "react";
import { handleSubmit } from "@/utils/handleSubmit";

export default function CustumerModal({ isModalOpen, setIsModalOpen }) {
  const [custumer, setCustumer] = useState({
    fullname: "",
    phone: "",
    address: "",
  });

  const pageHandleSubmit = (e) => {
    e.preventDefault();

    handleSubmit(e, "create", "custumers", custumer, setCustumer);

    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.sellModal}>
      <div className={styles.container}>
        <div className={styles.top}>
          <h2>Add new Client</h2>

          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            <Close />
          </button>
        </div>

        <form className={styles.bottom} onSubmit={pageHandleSubmit}>
          <Input
            type="text"
            name="fullname"
            placeholder="Имя клиента"
            value={custumer.fullname}
            setData={setCustumer}
          />
          <Input
            type="text"
            name="phone"
            placeholder="Номер телефона"
            value={custumer.phone}
            setData={setCustumer}
          />
          <Input
            type="text"
            name="address"
            placeholder="Адрес"
            value={custumer.address}
            setData={setCustumer}
          />

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
