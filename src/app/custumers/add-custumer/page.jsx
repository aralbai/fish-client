"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/input/Input";

export default function AddCustumer() {
  const [custumer, setCustumer] = useState({
    fullname: "",
    phone: "",
    address: "",
  });

  const [inputErr, setInputErr] = useState({
    fullname: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Example validation: Check if the input is empty
    const errorMessage =
      value.trim() === "" ? "Обязательное поле для ввода" : "";

    setCustumer((prevData) => ({
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

    if (custumer.fullname === "") {
      setInputErr((prevcustumer) => ({
        ...prevcustumer,
        fullname: "Обязательное поле для ввода",
      }));
      countErr += 1;
    }

    if (custumer.phone === "") {
      setInputErr((prevcustumer) => ({
        ...prevcustumer,
        phone: "Обязательное поле для ввода",
      }));
      countErr += 1;
    }

    if (custumer.address === "") {
      setInputErr((prevcustumer) => ({
        ...prevcustumer,
        address: "Обязательное поле для ввода",
      }));
      countErr += 1;
    }

    if (countErr > 0) {
      return;
    }

    await axios
      .post("http://localhost:5000/api/custumers", custumer)
      .then((res) => {
        toast.success(res.data);
        setCustumer({
          fullname: "",
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
            fullname="Вернуться к списку"
            url="/custumers"
            icon={<KeyboardBackspace />}
          >
            <KeyboardBackspace />
            Вернуться к списку
          </PrimaryBtn>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="fullname"
            placeholder="Название поставщика"
            value={custumer.fullname}
            handleChange={handleChange}
            err={inputErr.fullname}
          />
          <Input
            type="text"
            name="phone"
            placeholder="Номер телефона"
            value={custumer.phone}
            handleChange={handleChange}
            err={inputErr.phone}
          />
          <Input
            type="text"
            name="address"
            placeholder="Адрес"
            value={custumer.address}
            handleChange={handleChange}
            err={inputErr.address}
          />

          <PrimaryBtn type="button">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
