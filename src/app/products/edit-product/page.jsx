"use client";
import { KeyboardBackspace } from "@mui/icons-material";
import styles from "./page.module.scss";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Input from "@/components/input/Input";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditProduct() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const productTitle = searchParams.get("title");

  const [changedTitle, setChangedTitle] = useState(productTitle);
  const [inputErr, setInputErr] = useState("");

  const handleChange = (e) => {
    setChangedTitle(e.target.value);

    setInputErr("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productTitle === changedTitle) {
      return setInputErr("Ничего не изменилось.");
    }

    if (changedTitle <= 0) {
      return setInputErr("Обязательное поле для ввода");
    }

    await axios
      .put(`http://localhost:5000/api/products/${productId}`, {
        title: changedTitle,
      })
      .then((res) => {
        setChangedTitle("");
        toast.success(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  return (
    <div className={styles.editProduct}>
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
            value={changedTitle}
            handleChange={handleChange}
            err={inputErr}
          />

          <PrimaryBtn type="button">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
