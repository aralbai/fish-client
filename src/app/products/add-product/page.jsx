"use client";
import styles from "./page.module.scss";
import Input from "@/components/input/Input";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { KeyboardBackspace } from "@mui/icons-material";
import { useState } from "react";
import { handleSubmit } from "@/utils/handleSubmit";

export default function AddProduct() {
  const [product, setProduct] = useState({
    title: "",
  });

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

        <form
          onSubmit={(e) =>
            handleSubmit(e, "create", "products", product, setProduct)
          }
        >
          <Input
            type="text"
            name="title"
            placeholder="Количество"
            value={product.title}
            setData={setProduct}
          />

          <PrimaryBtn type="button">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
