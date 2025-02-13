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

        <form
          onSubmit={(e) =>
            handleSubmit(e, "create", "custumers", custumer, setCustumer)
          }
        >
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
            placeholder="	Номер телефона"
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

          <PrimaryBtn type="button">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
