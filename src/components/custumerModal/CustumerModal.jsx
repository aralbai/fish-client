import { Close } from "@mui/icons-material";
import styles from "./CustumerModal.module.scss";
import Input from "../input/Input";
import PrimaryBtn from "../primaryBtn/PrimaryBtn";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function CustumerModal({ isModalOpen, setIsModalOpen }) {
  const { user } = useContext(AuthContext);
  const [custumer, setCustumer] = useState({
    fullname: "",
    phone: "",
    address: "",
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...custumer,
      addedUserId: user?.id,
    };

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/custumers`, data)
      .then((res) => {
        toast.success(res.data);

        setCustumer({
          fullname: "",
          phone: "",
          address: "",
        });

        setIsModalOpen(false);
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
          <h2>Тазасын киритиў клиент</h2>

          <button onClick={() => setIsModalOpen(false)}>
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

          <PrimaryBtn type="submit">Сақлаў</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
