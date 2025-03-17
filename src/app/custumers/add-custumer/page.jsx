"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useContext, useState } from "react";
import Input from "@/components/input/Input";
import { handleSubmit } from "@/utils/handleSubmit";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddCustumer() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [custumer, setCustumer] = useState({
    fullname: "",
    phone: "",
    address: "",
    addedUserId: user?.id,
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/custumers`, custumer)
      .then((res) => {
        toast.success(res.data);

        router.push("/custumers");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div className={styles.addProduct}>
      <h1>Клиенты</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Создать новый клиент</h1>
          <PrimaryBtn
            type="link"
            fullname="Вернуться к списку"
            url="/custumers"
            icon={<KeyboardBackspace />}
          >
            <KeyboardBackspace />
            Вернуться к списку
          </PrimaryBtn>
        </div>

        <form onSubmit={pageHandleSubmit}>
          <div className={styles.inputGroup}>
            <Input
              type="text"
              name="fullname"
              placeholder="Имя клиента"
              value={custumer.fullname}
              setData={setCustumer}
              required={true}
            />
            <Input
              type="text"
              name="phone"
              placeholder="Номер телефона"
              value={custumer.phone}
              setData={setCustumer}
              required={false}
            />
            <Input
              type="text"
              name="address"
              placeholder="Адрес"
              value={custumer.address}
              setData={setCustumer}
              required={false}
            />
          </div>

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
