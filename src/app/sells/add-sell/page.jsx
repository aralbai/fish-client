"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/input/Input";

export default function AddSupplier() {
  const [supplier, setSupplier] = useState({
    title: "",
    phone: "",
    address: "",
  });

  const [inputErr, setInputErr] = useState({
    title: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Example validation: Check if the input is empty
    const errorMessage =
      value.trim() === "" ? "Обязательное поле для ввода" : "";

    setSupplier((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setInputErr((prevData) => ({
      ...prevData,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let countErr = 0;

    if (supplier.title === "") {
      setInputErr((prevSupplier) => ({
        ...prevSupplier,
        title: "Обязательное поле для ввода",
      }));
      countErr += 1;
    }

    if (supplier.phone === "") {
      setInputErr((prevSupplier) => ({
        ...prevSupplier,
        phone: "Обязательное поле для ввода",
      }));
      countErr += 1;
    }

    if (supplier.address === "") {
      setInputErr((prevSupplier) => ({
        ...prevSupplier,
        address: "Обязательное поле для ввода",
      }));
      countErr += 1;
    }

    if (countErr > 0) {
      return;
    }

    await axios
      .post("http://localhost:5000/api/suppliers", supplier)
      .then((res) => {
        toast.success(res.data);
        setSupplier({
          title: "",
          phone: "",
          address: "",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
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

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="title"
            placeholder="Название поставщика"
            value={supplier.title}
            handleChange={handleChange}
            err={inputErr.title}
          />
          <Input
            type="text"
            name="phone"
            placeholder="Номер телефона"
            value={supplier.phone}
            handleChange={handleChange}
            err={inputErr.phone}
          />
          <Input
            type="text"
            name="address"
            placeholder="Адрес"
            value={supplier.address}
            handleChange={handleChange}
            err={inputErr.address}
          />

          <PrimaryBtn type="button">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
