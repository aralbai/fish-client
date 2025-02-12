"use client";
import styles from "./page.module.scss";
import { KeyboardBackspace } from "@mui/icons-material";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/input/Input";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [inputErr, setInputErr] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);

    setInputErr("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length <= 0) {
      return setInputErr("Обязательное поле для ввода");
    }

    await axios
      .post("http://localhost:5000/api/products", { title })
      .then((res) => {
        toast.success(res.data);
        setTitle("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  return (
    <div className={styles.addProduct}>
      <h1>Продукты</h1>

      <div className={styles.form}>
        <div className={styles.top}>
          <h1>Создать новый продукт</h1>
          <PrimaryBtn
            type="link"
            title="Вернуться к списку"
            url="/products"
            icon={<KeyboardBackspace />}
          >
            <KeyboardBackspace />
            Вернуться к списку
          </PrimaryBtn>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Название продукта"
            value={title}
            handleChange={handleChange}
            err={inputErr}
          />

          <PrimaryBtn type="button">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
