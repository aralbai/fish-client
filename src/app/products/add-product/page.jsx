"use client";
import styles from "./page.module.scss";
import Input from "@/components/input/Input";
import PrimaryBtn from "@/components/primaryBtn/PrimaryBtn";
import { KeyboardBackspace } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [product, setProduct] = useState({
    title: "",
  });

  const pageHandleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: product.title,
      addedUserId: user.id,
      changedUserId: user.id,
    };

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/products`, data)
      .then((res) => {
        toast.success(res.data);

        router.push("/products");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
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

        <form onSubmit={pageHandleSubmit}>
          <div className={styles.inputGroup}>
            <Input
              type="text"
              name="title"
              placeholder="Количество"
              value={product.title}
              setData={setProduct}
              required={true}
            />
          </div>

          <PrimaryBtn type="submit">Сохранять</PrimaryBtn>
        </form>
      </div>
    </div>
  );
}
