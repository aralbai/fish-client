"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useState } from "react";
import Input from "@/components/input/Input";
import { handleSubmit } from "@/utils/handleSubmit";

export default function AddSupplier() {
  const [supplier, setSupplier] = useState({
    title: "",
    phone: "",
    address: "",
  });

  const pageHandleSubmit = (e) => {
    handleSubmit(e, "create", "suppliers", supplier, setSupplier);

    setSupplier({
      title: "",
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
            title="Вернуться к списку"
            url="/suppliers"
            icon={<KeyboardBackspace />}
          >
            <KeyboardBackspace />
            Вернуться к списку
          </PrimaryBtn>
        </div>

        <form onSubmit={pageHandleSubmit}>
          <Input
            type="text"
            name="title"
            placeholder="Название поставщика"
            value={supplier.title}
            setData={setSupplier}
            required={true}
          />
          <Input
            type="text"
            name="phone"
            placeholder="Номер телефона"
            value={supplier.phone}
            setData={setSupplier}
            required={false}
          />
          <Input
            type="text"
            name="address"
            placeholder="Адрес"
            value={supplier.address}
            setData={setSupplier}
            required={false}
          />

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
