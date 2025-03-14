"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useState } from "react";
import Input from "@/components/input/Input";
import { handleSubmit } from "@/utils/handleSubmit";

export default function AddCustumer() {
  const [custumer, setCustumer] = useState({
    fullname: "",
    phone: "",
    address: "",
  });

  const pageHandleSubmit = (e) => {
    handleSubmit(e, "create", "custumers", custumer, setCustumer);

    setCustumer({
      fullname: "",
      phone: "",
      address: "",
    });
  };

  return (
    <div className={styles.addProduct}>
      <h1>Поставщики</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Создать новый поставщик</h1>
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

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
